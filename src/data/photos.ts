import { Photo } from '../types';

const R2_BASE = 'https://pub-8d44826f329546d3945b9abda7ca5ab0.r2.dev';

const ROMAN = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
  'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX',
  'XXXI', 'XXXII', 'XXXIII', 'XXXIV', 'XXXV', 'XXXVI', 'XXXVII', 'XXXVIII', 'XXXIX', 'XL',
  'XLI', 'XLII', 'XLIII', 'XLIV', 'XLV', 'XLVI', 'XLVII', 'XLVIII', 'XLIX', 'L',
];

function toRoman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}

/**
 * 摄影作品列表 — 通过 model 字段归入对应 Section
 */
export const photos: Photo[] = [
  // ── Emma 系列（Cloudflare R2，已手动打码）──
  ...[
    'IMG_3839.jpg',
    'IMG_3842.jpg',
    'IMG_3849.jpg',
    'IMG_3867.jpg',
    'IMG_3879.jpg',
    'IMG_3882.jpg',
    'IMG_3883.jpg',
    'IMG_3887.jpg',
    'IMG_3902.jpg',
    'IMG_3911.jpg',
    'IMG_3922.jpg',
    'IMG_3925.jpg',
    'IMG_3938.jpg',
    'IMG_3945.jpg',
    'IMG_3947.jpg',
    'IMG_3959.jpg',
    'IMG_3966.jpg',
    'IMG_3967.jpg',
    'IMG_3969.jpg',
    'IMG_3993(1).jpg',
    'IMG_4000.jpg',
    'IMG_4020.jpg',
    'IMG_4029.jpg',
  ].map((filename, index) => ({
    id: `emma-${filename.replace(/\.(jpg|JPG)$/i, '').toLowerCase()}`,
    model: 'emma' as const,
    url: `${R2_BASE}/Emma/${filename}`,
    title: `Emma · ${toRoman(index + 1)}`,
    tags: ['人像'],
    takenAt: '2025-07-05',
  })),

  // ── Maya 系列（Cloudflare R2）──
  ...[
    'IMG_5015',
    'IMG_5022',
    'IMG_5029',
    'IMG_5065',
    'IMG_5080',
    'IMG_5083',
    'IMG_5094',
    'IMG_5114',
    'IMG_5137',
    'IMG_5141',
    'IMG_5158',
    'IMG_5179',
    'IMG_5186',
    'IMG_5191',
    'IMG_5196',
    'IMG_5212',
    'IMG_5215',
    'IMG_5222',
    'IMG_5238',
  ].map((filename, index) => ({
    id: `maya-${filename.replace('IMG_', '')}`,
    model: 'maya' as const,
    url: `${R2_BASE}/Maya/${filename}.jpg`,
    title: `Maya · ${toRoman(index + 1)}`,
    tags: ['人像'],
    takenAt: '2025-08-16',
  })),

  // ── Aria 系列（Cloudflare R2）──
  ...[
    '3f4e2d0417b72520bbf1f9a943393c4.jpg',
    '759785074c4f6a6dde7965b7850c9af.jpg',
    '9ef5138761737716206d526d948f062.jpg',
    'IMG_2726.JPG',
    'IMG_2732.JPG',
    'IMG_2755.JPG',
    'IMG_2783.JPG',
    'IMG_2791.JPG',
    'IMG_2805.JPG',
    'IMG_2837.JPG',
    'IMG_2858.JPG',
    'IMG_2913.JPG',
    'a4af9300d85440e51e876fdd7ef26e8.jpg',
    'a993d814df1229f7d86c6f46b9acc01.jpg',
    'beadba926a80acc7ae71ecceb0fb707.jpg',
    'c423a997063fd3a18dfd6e6e20091a6.jpg',
    'de0b5b8cd671c8c92af262c4dc45c8b.jpg',
    'eca10b190b2388c08ba9b9f61c2abe3.jpg',
  ].map((filename, index) => ({
    id: `aria-${filename.replace(/\.(jpg|JPG)$/i, '').toLowerCase()}`,
    model: 'aria' as const,
    url: `${R2_BASE}/Aria/${filename}`,
    title: `Aria · ${toRoman(index + 1)}`,
    tags: ['人像'],
    takenAt: '2025-07-05',
  })),

  // ── Anika 系列（Cloudflare R2）──
  ...[
    'IMG_2979.jpg',
    'IMG_3009.jpg',
    'IMG_3020.jpg',
    'IMG_3041.jpg',
    // IMG_3047.jpg — R2 暂未上传
    'IMG_3097.jpg',
    'IMG_3110.jpg',
    'IMG_3115.jpg',
    'IMG_3156(1).jpg',
    'IMG_3202(1).jpg',
    'IMG_3219.jpg',
  ].map((filename, index) => ({
    id: `anika-${filename.replace(/\.(jpg|JPG)$/i, '').toLowerCase()}`,
    model: 'anika' as const,
    url: `${R2_BASE}/Anika/${filename}`,
    title: `Anika · ${toRoman(index + 1)}`,
    tags: ['人像'],
    takenAt: '2025-07-05',
  })),

  // ── Sana 系列（Cloudflare R2）──
  ...[
    'IMG_3269', 'IMG_3277', 'IMG_3288', 'IMG_3293', 'IMG_3297', 'IMG_3299',
    'IMG_3307', 'IMG_3322', 'IMG_3328', 'IMG_3333', 'IMG_3349', 'IMG_3356',
    'IMG_3361', 'IMG_3366', 'IMG_3374', 'IMG_3395', 'IMG_3419', 'IMG_3438',
    'IMG_3445', 'IMG_3447', 'IMG_3455', 'IMG_3474', 'IMG_3485', 'IMG_3496',
    'IMG_3531', 'IMG_3545', 'IMG_3564', 'IMG_3567', 'IMG_3581', 'IMG_3588',
    'IMG_3605', 'IMG_3651', 'IMG_3657', 'IMG_3667', 'IMG_3671', 'IMG_3681',
    'IMG_3683', 'IMG_3698', 'IMG_3702', 'IMG_3714', 'IMG_3738', 'IMG_3746',
    'IMG_3759', 'IMG_3773', 'IMG_3781', 'IMG_3784', 'IMG_3796',
  ].map((filename, index) => ({
    id: `sana-${filename.replace('IMG_', '')}`,
    model: 'sana' as const,
    url: `${R2_BASE}/Sana/${filename}.jpg`,
    title: `Sana · ${toRoman(index + 1)}`,
    tags: ['人像'],
    takenAt: '2025-07-05',
  })),

  // ── Akari 系列（Cloudflare R2）──
  ...[
    'IMG_5286', 'IMG_5292', 'IMG_5299', 'IMG_5305',
    'IMG_5327', 'IMG_5328', 'IMG_5343', 'IMG_5350',
  ].map((filename, index) => ({
    id: `akari-${filename.replace('IMG_', '')}`,
    model: 'akari' as const,
    url: `${R2_BASE}/Akari/${filename}.jpg`,
    title: `Akari · ${toRoman(index + 1)}`,
    tags: ['人像'],
    takenAt: '2025-07-05',
  })),

  // ── Ada 系列（Cloudflare R2）──
  ...[
    'IMG_2552', 'IMG_2554', 'IMG_2562', 'IMG_2564', 'IMG_2566', 'IMG_2569',
    'IMG_2570', 'IMG_2574', 'IMG_2577', 'IMG_2582', 'IMG_2593', 'IMG_2599',
    'IMG_2600', 'IMG_2607', 'IMG_2612', 'IMG_2615', 'IMG_2618', 'IMG_2619',
  ].map((filename, index) => ({
    id: `ada-${filename.replace('IMG_', '')}`,
    model: 'ada' as const,
    url: `${R2_BASE}/Ada/${filename}.jpg`,
    title: `Ada · ${toRoman(index + 1)}`,
    tags: ['人像'],
    takenAt: '2025-07-05',
  })),

  // ── 建筑与风景系列 ──
  {
    id: 'villa-01',
    model: 'architecture',
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
    model: 'architecture',
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
    model: 'architecture',
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
    model: 'architecture',
    url: '/images/Villa4.jpg',
    title: '别墅光影 IV',
    description: '傍晚时分，暖色调从室外渗入室内空间。',
    location: '江南',
    tags: ['建筑', '黄昏'],
    takenAt: '2025-03-13',
    camera: 'Sony A7C',
  },
];
