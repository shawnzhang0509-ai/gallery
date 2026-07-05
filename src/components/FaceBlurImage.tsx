import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaceRegion } from '../types';

export type PrivacyMaskMode = 'pixelate' | 'blur';

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
  faceRegions?: FaceRegion[];
  maskMode?: PrivacyMaskMode;
  loading?: 'lazy' | 'eager';
  hoverScale?: boolean;
}

function buildMaskStyle(
  src: string,
  face: FaceRegion,
  mode: PrivacyMaskMode,
): React.CSSProperties {
  const bgWidth = `${(100 / face.width) * 100}%`;
  const bgHeight = `${(100 / face.height) * 100}%`;
  const bgLeft = `${-(face.left / face.width) * 100}%`;
  const bgTop = `${-(face.top / face.height) * 100}%`;

  if (mode === 'pixelate') {
    return {
      backgroundImage: `url(${src})`,
      backgroundSize: `${bgWidth} ${bgHeight}`,
      backgroundPosition: `${bgLeft} ${bgTop}`,
      backgroundRepeat: 'no-repeat',
      transform: 'scale(0.12)',
      transformOrigin: 'top left',
      width: '833%',
      height: '833%',
      imageRendering: 'pixelated',
    };
  }

  return {
    backgroundImage: `url(${src})`,
    backgroundSize: `${bgWidth} ${bgHeight}`,
    backgroundPosition: `${bgLeft} ${bgTop}`,
    backgroundRepeat: 'no-repeat',
    filter: 'blur(28px)',
    transform: 'scale(1.15)',
    transformOrigin: 'center',
    width: '100%',
    height: '100%',
  };
}

export const FaceBlurImage: React.FC<FaceBlurImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = 'w-full',
  blurFaces = false,
  faceRegions,
  maskMode = 'pixelate',
  loading = 'lazy',
  hoverScale = false,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [faces, setFaces] = useState<FaceRegion[]>([]);
  const [ready, setReady] = useState(!blurFaces);

  const resolveFaces = useCallback(
    async (img: HTMLImageElement) => {
      if (!blurFaces) {
        setFaces([]);
        setReady(true);
        return;
      }

      if (faceRegions && faceRegions.length > 0) {
        setFaces(faceRegions);
        setReady(true);
        return;
      }

      try {
        const model = await getModel();
        const predictions = await model.estimateFaces(img, false);
        setFaces(predictionsToBoxes(predictions, img));
      } catch {
        setFaces([]);
      } finally {
        setReady(true);
      }
    },
    [blurFaces, faceRegions],
  );

  useEffect(() => {
    setReady(!blurFaces);
    setFaces([]);
  }, [src, blurFaces, faceRegions]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !blurFaces) return;

    const sync = () => resolveFaces(img);

    if (img.complete && img.naturalWidth > 0) {
      sync();
    } else {
      img.addEventListener('load', sync);
      return () => img.removeEventListener('load', sync);
    }
  }, [src, blurFaces, faceRegions, resolveFaces]);

  const hoverClass = hoverScale
    ? 'transition-transform duration-700 ease-out group-hover:scale-[1.03]'
    : '';

  return (
    <div className={`relative ${wrapperClassName} ${hoverClass}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        style={{ opacity: ready ? 1 : 0.85, transition: 'opacity 0.25s' }}
      />

      {blurFaces &&
        faces.map((face, index) => (
          <div
            key={`${src}-${index}`}
            className="pointer-events-none absolute z-10 overflow-hidden"
            style={{
              left: `${face.left}%`,
              top: `${face.top}%`,
              width: `${face.width}%`,
              height: `${face.height}%`,
              borderRadius: modeRadius(maskMode),
            }}
            aria-hidden
          >
            <div className="h-full w-full" style={buildMaskStyle(src, face, maskMode)} />
          </div>
        ))}
    </div>
  );
};

function modeRadius(mode: PrivacyMaskMode): string {
  return mode === 'pixelate' ? '4px' : '50%';
}
