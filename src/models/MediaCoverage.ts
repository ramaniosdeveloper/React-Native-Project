export interface MediaCoverage {
  id: string;
  title: string;
  language: string;
  mediaType: number;
  coverageURL: string;
  publishedAt: string;
  publishedBy: string;
  description: string;

  thumbnail?: {
    id: string;
    version: number;
    domain: string;
    basePath: string;
    key: string;
    qualities: number[];
    aspectRatio: number;
  };
}