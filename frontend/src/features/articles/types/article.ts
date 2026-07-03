export type MediaType = "image" | "video" | "youtube";

export interface Media {
  id: number;
  file_url: string;
  file_path: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface ArticleFormValues {
  title: string;
  excerpt: string;
  content: string;

  media_type: MediaType;

  featured_image: Media | null;
  thumbnail: Media | null;
  video_url: Media | null;

  youtube_url: string;
  media_caption: string;

  is_headline_news: boolean;
  headline_display_type: "image" | "text" | "both";
  headline_order: number;

  status: "draft" | "pending" | "published";

  scheduled_for: string;

  meta_title: string;
  meta_description: string;
  canonical_url: string;

  city_focus: string;
  target_countries: string[];

  category_ids: Category[];
  tag_ids: Tag[];
}