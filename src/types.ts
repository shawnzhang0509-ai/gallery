export interface Photo {
  id: string;
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
}

export type PhotoCategory = '全部' | string;
