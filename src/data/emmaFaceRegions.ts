import { FaceRegion } from '../types';

/** Emma 各图人脸区域（百分比），用于缓存旧图时的备用打码 */
export const emmaFaceRegions: Record<string, FaceRegion[]> = {
  'IMG_3839.jpg': [{ left: 53.8, top: 20.1, width: 18.2, height: 18.2 }],
  'IMG_3842.jpg': [{ left: 42.2, top: 22.6, width: 19.4, height: 19.4 }],
  'IMG_3867.jpg': [{ left: 18, top: 20.7, width: 16.3, height: 16.3 }],
  'IMG_3879.jpg': [{ left: 20.4, top: 21.4, width: 19.7, height: 19.7 }],
  'IMG_3882.jpg': [{ left: 40.7, top: 28.4, width: 23, height: 23 }],
  'IMG_3883.jpg': [{ left: 39.5, top: 28.9, width: 25.1, height: 25.1 }],
  'IMG_3887.jpg': [{ left: 37.2, top: 24, width: 20, height: 20 }],
  'IMG_3911.jpg': [{ left: 76.2, top: 44, width: 15.7, height: 15.7 }],
  'IMG_3922.jpg': [{ left: 69.5, top: 39.1, width: 17.7, height: 17.7 }],
  'IMG_3959.jpg': [{ left: 44.5, top: 23.1, width: 19.8, height: 19.8 }],
  'IMG_3966.jpg': [{ left: 32.8, top: 28, width: 20.7, height: 20.7 }],
  'IMG_3967.jpg': [{ left: 31.4, top: 27, width: 22.9, height: 22.9 }],
  'IMG_3969.jpg': [{ left: 39.9, top: 26.4, width: 28.8, height: 28.8 }],
  'IMG_3993(1).jpg': [{ left: 25.2, top: 12, width: 30.8, height: 30.8 }],
  'IMG_4020.jpg': [{ left: 48.7, top: 2.6, width: 25.8, height: 25.8 }],
};

/** 更换 R2 图片后递增，强制浏览器拉取最新文件 */
export const EMMA_MEDIA_VERSION = '3';
