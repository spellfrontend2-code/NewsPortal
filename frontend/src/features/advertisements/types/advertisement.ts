export type MediaType = "image" | "video" | "html" | "text";

export type AdvertisementForm = {
  // Block 1 — Ad Creative
  name: string;
  advertiser_name: string;
  media_type: MediaType;
  image_url: any;
  video_url: any;
  video_thumbnail: any;
  html_code: string;
  text_content: string;
  click_url: string;
  button_text: string;

  // Block 2 — Placement (Dependent)
  page: string;
  section: string;
  where: string;
  category_id: number | string | null;
  article_id: number | string | null;
  tag_id: number | string | null;
  author_id: number | string | null;
  all_entities: boolean;
  article_number: number | string | null;
  paragraph_number: number | string | null;

  // Block 3 — Size + Schedule
  size: string;
  custom_width?: number | string | null;
  custom_height?: number | string | null;
  mobile_size: string;
  custom_mobile_width?: number | string | null;
  custom_mobile_height?: number | string | null;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: "active" | "draft" | "paused" | "ended" | "pending_approval" | "rejected" | "archived" | string;

  // Optional legacy metadata
  id?: number | string;
  slug?: string;
  priority?: number | null;
  approved?: boolean | null;
};

export type FormPageOption = {
  value: string;
  label: string;
  needs_entity?: "category" | "article" | "tag" | "author";
  entity_searchable?: boolean;
  sections: FormSectionOption[];
};

export type FormSectionOption = {
  value: string;
  label: string;
  hide_where?: boolean;
  needs_category?: boolean;
  where: FormWhereOption[];
  sizes: string[];
  default_size?: string;
  suggested_mobile_size?: string;
};

export type FormWhereOption = {
  value: string;
  label: string;
  needs?: "article_number" | "paragraph_number" | null;
};

export type FormOptionsResponse = {
  status?: boolean;
  message?: string;
  data?: {
    form?: {
      pages: FormPageOption[];
      articles_search?: {
        endpoint: string;
        method: string;
        field: string;
        all_field: string;
      };
    };
    pages?: FormPageOption[];
    categories?: Array<{ id: number; name: string; slug?: string }>;
    articles?: Array<{ value: number | null; label: string; slug?: string; status?: string; all?: boolean }>;
    tags?: Array<{ id: number; name: string; slug?: string }>;
    authors?: Array<{ id: number; name: string }>;
  };
};