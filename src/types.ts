export interface Photo {
  id: string;
  /** 所属模特 / 主题分组 */
  model: string;
  /** 原图 URL — 支持 Cloudflare R2 / Images 等外链 */
  url: string;
  /** 缩略图（可选，Cloudflare Images 可填 /public 变体） */
  thumbnailUrl?: string;
  title: string;
  description?: string;
  location?: string;
  tags: string[];
  /** ISO 日期，如 "2025-06-15" */
  takenAt?: string;
  camera?: string;
  lens?: string;
  /** 自动检测并模糊人脸，保护隐私 */
  blurFaces?: boolean;
  /** 手动指定模糊区域（百分比），比自动检测更精准 */
  faceRegions?: FaceRegion[];
}

/** 人脸模糊区域，数值为相对图片宽高的百分比 */
export interface FaceRegion {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface GallerySectionConfig {
  id: string;
  model: string;
  title: string;
  subtitle: string;
}

export interface GallerySection extends GallerySectionConfig {
  photos: Photo[];
}
