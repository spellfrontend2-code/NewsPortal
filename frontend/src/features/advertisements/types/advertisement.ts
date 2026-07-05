export type AdvertisementForm = {
  title: string;
  advertiser_name: string;
  advertiser_email: string;
  advertiser_website: string;

  ad_type: string;

  image_url: File | null;
  video_url: File | null;
  video_thumbnail: File | null;

  html_code: string;
  text_content: string;

  target_url: string;
  target_blank: string;
  cta_text: string;

  placement: string;

  target_categories_ids: string[];
  target_tags_ids: string[];

  target_countries: string[];
  target_devices: string[];
  target_audiences: string[];

  starts_at: string;
  ends_at: string;

  daily_start_time: string;
  daily_end_time: string;

  pricing_model: string;
  price: string;
  daily_budget: string;
  total_budget: string;

  priority: number | null;

  status: string;
  approved: boolean | null;
};