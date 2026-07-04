import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaceRegion } from '../types';

type BlazeFaceModel = {
  estimateFaces: (
    input: HTMLImageElement,
    returnTensors: boolean,
  ) => Promise<
    Array<{
      topLeft: [number, number];
      bottomRight: [number, number];
    }>
  >;
};

let modelPromise: Promise<BlazeFaceModel> | null = null;

async function getModel(): Promise<BlazeFaceModel> {
  if (!modelPromise) {
    modelPromise = (async () => {
      const [tf, blazeface] = await Promise.all([
        import('@tensorflow/tfjs'),
        import('@tensorflow-models/blazeface'),
      ]);
      await tf.ready();
      return blazeface.load();
    })();
  }
  return modelPromise;
}

function predictionsToBoxes(
  predictions: Array<{ topLeft: [number, number]; bottomRight: [number, number] }>,
  img: HTMLImageElement,
): FaceRegion[] {
  const pad = 0.35;
  return predictions.map((face) => {
    const [x1, y1] = face.topLeft;
    const [x2, y2] = face.bottomRight;
    const fw = x2 - x1;
    const fh = y2 - y1;
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const left = Math.max(0, x1 - fw * pad * 0.5);
    const top = Math.max(0, y1 - fh * pad * 0.5);
    const right = Math.min(w, x2 + fw * pad * 0.5);
    const bottom = Math.min(h, y2 + fh * pad * 0.5);

    return {
      left: (left / w) * 100,
      top: (top / h) * 100,
      width: ((right - left) / w) * 100,
      height: ((bottom - top) / h) * 100,
    };
  });
}

interface FaceBlurImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  blurFaces?: boolean;
  /** 手动标定的模糊区域，优先于自动检测 */
  faceRegions?: FaceRegion[];
  loading?: 'lazy' | 'eager';
}

export const FaceBlurImage: React.FC<FaceBlurImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = 'w-full',
  blurFaces = false,
  faceRegions,
  loading = 'lazy',
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [faces, setFaces] = useState<FaceRegion[]>([]);
  const [ready, setReady] = useState(!blurFaces);

  const resolveFaces = useCallback(
    async (img: HTMLImageElement) => {
      if (!blurFaces) {
        setReady(true);
        return;
      }

      if (faceRegions && faceRegions.length > 0) {
        setFaces(faceRegions);
        setReady(true);
        return;
      }

      try {
        const probe = new Image();
        probe.crossOrigin = 'anonymous';
        probe.src = src;
        await new Promise<void>((resolve, reject) => {
          probe.onload = () => resolve();
          probe.onerror = () => reject(new Error('CORS probe failed'));
        });

        const model = await getModel();
        const predictions = await model.estimateFaces(probe, false);
        setFaces(predictionsToBoxes(predictions, img));
      } catch {
        console.warn('Face auto-detection unavailable; add faceRegions for accurate blur.');
        setFaces([]);
      } finally {
        setReady(true);
      }
    },
    [blurFaces, faceRegions, src],
  );

  useEffect(() => {
    setFaces([]);
    setReady(!blurFaces);
  }, [src, blurFaces, faceRegions]);

  const handleLoad = () => {
    const img = imgRef.current;
    if (img) resolveFaces(img);
  };

  return (
    <div className={`relative ${wrapperClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        onLoad={handleLoad}
        style={{ opacity: ready ? 1 : 0.6, transition: 'opacity 0.3s' }}
      />

      {blurFaces &&
        faces.map((face, index) => (
          <div
            key={index}
            className="pointer-events-none absolute overflow-hidden"
            style={{
              left: `${face.left}%`,
              top: `${face.top}%`,
              width: `${face.width}%`,
              height: `${face.height}%`,
              borderRadius: '50%',
            }}
          >
            <img
              src={src}
              alt=""
              aria-hidden
              className="absolute max-w-none"
              style={{
                left: `${-(face.left / face.width) * 100}%`,
                top: `${-(face.top / face.height) * 100}%`,
                width: `${(100 / face.width) * 100}%`,
                height: `${(100 / face.height) * 100}%`,
                filter: 'blur(32px)',
                transform: 'scale(1.15)',
              }}
            />
          </div>
        ))}
    </div>
  );
};
