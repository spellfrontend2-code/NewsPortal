import { useForm } from "react-hook-form";
import type { AdvertisementForm } from "../types/advertisement";

export function useAdvertisementForm({ advertisement }: { advertisement?: any; type?: string }) {
  // Format dates safely
  const todayStr = new Date().toISOString().slice(0, 10);

  const getInitialStartDate = () => {
    if (advertisement?.start_date) return advertisement.start_date.slice(0, 10);
    if (advertisement?.starts_at) return advertisement.starts_at.slice(0, 10);
    return todayStr;
  };

  const getInitialEndDate = () => {
    if (advertisement?.end_date) return advertisement.end_date.slice(0, 10);
    if (advertisement?.ends_at) return advertisement.ends_at.slice(0, 10);
    return "";
  };

  const getInitialStartTime = () => {
    if (advertisement?.start_time) return advertisement.start_time.slice(0, 5);
    if (advertisement?.daily_start_time) return advertisement.daily_start_time.slice(0, 5);
    return "00:00";
  };

  const getInitialEndTime = () => {
    if (advertisement?.end_time) return advertisement.end_time.slice(0, 5);
    if (advertisement?.daily_end_time) return advertisement.daily_end_time.slice(0, 5);
    return "23:59";
  };

  const getInitialSize = () => {
    if (advertisement?.size) return advertisement.size;
    if (advertisement?.slot?.width && advertisement?.slot?.height) {
      return `${advertisement.slot.width}x${advertisement.slot.height}`;
    }
    if (advertisement?.width && advertisement?.height) {
      return `${advertisement.width}x${advertisement.height}`;
    }
    return "728x90";
  };

  const getInitialMobileSize = () => {
    if (advertisement?.mobile_size) return advertisement.mobile_size;
    if (advertisement?.slot?.mobile_width && advertisement?.slot?.mobile_height) {
      return `${advertisement.slot.mobile_width}x${advertisement.slot.mobile_height}`;
    }
    if (advertisement?.mobile_width && advertisement?.mobile_height) {
      return `${advertisement.mobile_width}x${advertisement.mobile_height}`;
    }
    return "320x100";
  };

  const placementObj = advertisement?.placement && typeof advertisement.placement === "object"
    ? advertisement.placement
    : {};

  const initialPage = advertisement?.page || placementObj.page || "home";
  const initialSection = advertisement?.section || placementObj.section || (initialPage === "single" ? "article_content" : "article_list");
  const initialWhere = advertisement?.where || placementObj.where || advertisement?.slot?.position_type || (initialPage === "single" ? "after_paragraph" : "after_article");

  const formMethods = useForm<AdvertisementForm>({
    defaultValues: {
      name: advertisement?.name || advertisement?.title || "",
      advertiser_name: advertisement?.advertiser_name || "",
      media_type: advertisement?.media_type || advertisement?.type || advertisement?.ad_type || "image",

      image_url: advertisement?.image_url || advertisement?.image || null,
      video_url: advertisement?.video_url || advertisement?.video || null,
      video_thumbnail: advertisement?.video_thumbnail || advertisement?.thumbnail || null,
      html_code: advertisement?.html_code || advertisement?.html || "",
      text_content: advertisement?.text_content || advertisement?.text || "",

      click_url: advertisement?.click_url || advertisement?.url || advertisement?.target_url || "",
      button_text: advertisement?.button_text || advertisement?.cta || advertisement?.cta_text || "",

      page: initialPage,
      section: initialSection,
      where: initialWhere,

      category_id: advertisement?.category_id ?? placementObj.category_id ?? null,
      article_id: advertisement?.article_id ?? placementObj.article_id ?? null,
      tag_id: advertisement?.tag_id ?? placementObj.tag_id ?? null,
      author_id: advertisement?.author_id ?? placementObj.author_id ?? null,
      all_entities: Boolean(advertisement?.all_entities ?? placementObj.all_entities),

      article_number: advertisement?.article_number ?? placementObj.article_number ?? advertisement?.slot?.article_position ?? (initialWhere === "after_article" ? 3 : null),
      paragraph_number: advertisement?.paragraph_number ?? placementObj.paragraph_number ?? advertisement?.slot?.paragraph_position ?? (initialWhere === "after_paragraph" ? 3 : null),

      size: getInitialSize(),
      custom_width: advertisement?.custom_width || null,
      custom_height: advertisement?.custom_height || null,
      mobile_size: getInitialMobileSize(),

      start_date: getInitialStartDate(),
      end_date: getInitialEndDate(),
      start_time: getInitialStartTime(),
      end_time: getInitialEndTime(),

      status: advertisement?.status || "active",
      priority: advertisement?.priority ?? 0,
      approved: advertisement?.approved ?? true,
    },
  });

  return formMethods;
}
