export interface Photo {
  id: string;
  url: string;
  title?: string;
  description?: string;
  tags: string[];
  createdAt: number;
  source: 'upload' | 'generated' | 'sample';
  width?: number;
  height?: number;
}

export interface AnalysisResult {
  description: string;
  tags: string[];
}

export enum ModalType {
  NONE,
  UPLOAD,
  GENERATE,
  VIEW
}