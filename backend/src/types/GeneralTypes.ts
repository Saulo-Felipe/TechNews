export interface DefaultResponse<DataType = any> {
  error?: string;
  success?: string;
  data?: DataType;
}

export interface ClassValidatorError {
  error: string;
  message: string[];
  statusCode?: number;
}

export interface ClassValidatorSuccess {
  success: string;
  message: string[];
  data?: any;
}

export interface NewsPreviewCardParsedToJson {
  url: string;
  title: string;
  image_url: string;
  category: string;
}

export interface ScrapeOneNews {
  content: string;
  title: string;
  excerpt: string;
  author: string;
  publicationDate: string;
  tags: string[];
  category: string;
}

export interface ScrapeLatestNewsURL {
  url: string;
  coverImageUrl: string;
}

export interface User {
  id: number;
  username: string;
  email: string | null;
}

export interface NewsPreview {
  title: string;
  id: number;
  excerpt: string;
  cover_image_url: string;
}
