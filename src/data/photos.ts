import { Photo } from '../types';

/**
 * 摄影作品列表
 *
 * 添加新作品：复制下方对象，把 `url` 换成你的 Cloudflare 链接即可。
 *
 * Cloudflare R2 公开桶示例：
 *   url: 'https://pub-xxxx.r2.dev/photos/sunset.jpg'
 *
 * Cloudflare Images 示例：
 *   url: 'https://imagedelivery.net/<HASH>/<IMAGE_ID>/public'
 *   thumbnailUrl: 'https://imagedelivery.net/<HASH>/<IMAGE_ID>/thumbnail'
 */
export const photos: Photo[] = [
  {
    id: 'villa-01',
    url: '/images/Villa1.jpg',
    title: '别墅光影 I',
    description: '午后斜光穿过窗棂，在墙面留下柔和的几何阴影。',
    location: '江南',
    tags: ['建筑', '光影'],
    takenAt: '2025-03-12',
    camera: 'Sony A7C',
  },
  {
    id: 'villa-02',
    url: '/images/Villa2.jpg',
    title: '别墅光影 II',
    description: '庭院与室内空间的对话，静谧而克制。',
    location: '江南',
    tags: ['建筑', '室内'],
    takenAt: '2025-03-12',
    camera: 'Sony A7C',
  },
  {
    id: 'villa-03',
    url: '/images/Villa3.jpg',
    title: '别墅光影 III',
    description: '线条与材质的层次，在阴天里显得格外沉静。',
    location: '江南',
    tags: ['建筑', '极简'],
    takenAt: '2025-03-13',
    camera: 'Sony A7C',
  },
  {
    id: 'villa-04',
    url: '/images/Villa4.jpg',
    title: '别墅光影 IV',
    description: '傍晚时分，暖色调从室外渗入室内空间。',
    location: '江南',
    tags: ['建筑', '黄昏'],
    takenAt: '2025-03-13',
    camera: 'Sony A7C',
  },

  // ── 在此下方继续添加 Cloudflare 作品 ──
  // {
  //   id: 'cf-001',
  //   url: 'https://imagedelivery.net/你的HASH/图片ID/public',
  //   thumbnailUrl: 'https://imagedelivery.net/你的HASH/图片ID/thumbnail',
  //   title: '作品标题',
  //   description: '一句话描述',
  //   location: '拍摄地点',
  //   tags: ['风光', '旅行'],
  //   takenAt: '2025-07-01',
  //   camera: '相机型号',
  // },
];
