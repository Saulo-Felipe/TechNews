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
}