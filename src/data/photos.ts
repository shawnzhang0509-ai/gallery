import { Photo } from '../types';

const R2_BASE = 'https://pub-8d44826f329546d3945b9abda7ca5ab0.r2.dev';

/**
 * 摄影作品列表
 *
 * 添加新作品：复制下方对象，把 `url` 换成你的 Cloudflare 链接即可。
 * 人像照片建议设置 blurFaces: true 以自动模糊人脸。
 */
export const photos: Photo[] = [
  // ── Emma 系列（Cloudflare R2）──
  {
    id: 'emma-3839',
    url: `${R2_BASE}/Emma/IMG_3839.jpg`,
    title: 'Emma · I',
    tags: ['人像', 'Emma'],
    takenAt: '2025-07-05',
    blurFaces: true,
  },
  {
    id: 'emma-3842',
    url: `${R2_BASE}/Emma/IMG_3842.jpg`,
    title: 'Emma · II',
    tags: ['人像', 'Emma'],
    takenAt: '2025-07-05',
    blurFaces: true,
  },
  {
    id: 'emma-3867',
    url: `${R2_BASE}/Emma/IMG_3867.jpg`,
    title: 'Emma · III',
    tags: ['人像', 'Emma'],
    takenAt: '2025-07-05',
    blurFaces: true,
  },
  {
    id: 'emma-3879',
    url: `${R2_BASE}/Emma/IMG_3879.jpg`,
    title: 'Emma · IV',
    tags: ['人像', 'Emma'],
    takenAt: '2025-07-05',
    blurFaces: true,
  },
  {
    id: 'emma-3911',
    url: `${R2_BASE}/Emma/IMG_3911.jpg`,
    title: 'Emma · V',
    tags: ['人像', 'Emma'],
    takenAt: '2025-07-05',
    blurFaces: true,
  },
  {
    id: 'emma-3922',
    url: `${R2_BASE}/Emma/IMG_3922.jpg`,
    title: 'Emma · VI',
    tags: ['人像', 'Emma'],
    takenAt: '2025-07-05',
    blurFaces: true,
  },
  {
    id: 'emma-3993',
    url: `${R2_BASE}/Emma/IMG_3993(1).jpg`,
    title: 'Emma · VII',
    tags: ['人像', 'Emma'],
    takenAt: '2025-07-05',
    blurFaces: true,
  },

  // ── 建筑系列（本地样片）──
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
];
