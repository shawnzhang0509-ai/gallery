import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface FaceBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

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

/** 检测失败时的备用模糊区域（人像常见构图：画面上方居中） */
const PORTRAIT_FALLBACK: FaceBox[] = [{ left: 28, top: 6, width: 44, height: 40 }];

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

interface FaceBlurImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  blurFaces?: boolean;
  loading?: 'lazy' | 'eager';
}

export const FaceBlurImage: React.FC<FaceBlurImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = 'w-full',
  blurFaces = false,
  loading = 'lazy',
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [faces, setFaces] = useState<FaceBox[]>([]);
  const [ready, setReady] = useState(!blurFaces);

  const detectFaces = useCallback(
    async (img: HTMLImageElement) => {
      if (!blurFaces) {
        setReady(true);
        return;
      }

      const toBoxes = (
        predictions: Array<{ topLeft: [number, number]; bottomRight: [number, number] }>,
      ) => {
        const pad = 0.25;
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
      };

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
        const boxes = toBoxes(predictions);
        setFaces(boxes.length > 0 ? boxes : PORTRAIT_FALLBACK);
      } catch {
        // R2 未配置 CORS 时自动检测不可用，使用备用区域保护隐私
        setFaces(PORTRAIT_FALLBACK);
      } finally {
        setReady(true);
      }
    },
    [blurFaces, src],
  );

  useEffect(() => {
    setFaces([]);
    setReady(!blurFaces);
  }, [src, blurFaces]);

  const handleLoad = () => {
    const img = imgRef.current;
    if (img) detectFaces(img);
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
                filter: 'blur(28px)',
                transform: 'scale(1.1)',
              }}
            />
          </div>
        ))}
    </div>
  );
};
