export interface Category {
  id: number;
  name: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  cover_image_url: string;
  images_url: string[];
  content_type: "html" | "json";
  url: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  originalContent: "CNN" | "TechNews";
  publicationDate: string;
}

export interface User {
  id: number;
  username: string;
  email: string | null;
}

export interface ValidatorErrorResponse {
  error?: string;
  message?: string[],
  statusCode?: number;
}

export interface ValidatorSuccessResponse<T = any> {
  success?: string;
  message?: string[];
  data?: T;
}

export interface ValidatorResponse extends ValidatorErrorResponse, ValidatorSuccessResponse {};


export interface DefaultResponse<T> {
  error?: string;
  success?: string;
  data?: T;
}


export interface Tag {
  id: number;
  name: string;
}

export interface NewsWithUserAndTag extends News {
  user: User;
  tags: Tag[];
}

export interface NewsPreview {
  title: string;
  id: number;
  excerpt: string;
  cover_image_url: string;
}
