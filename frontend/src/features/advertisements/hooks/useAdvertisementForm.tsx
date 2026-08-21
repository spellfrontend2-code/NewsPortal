import { useForm } from "react-hook-form";
import type { AdvertisementForm } from "../types/advertisement";

export const KNOWN_SIZES = [
  "728x90",
  "970x250",
  "300x250",
  "300x600",
  "468x60",
  "320x50",
  "320x100",
  "600x400",
  "400x300",
];

export const KNOWN_MOBILE_SIZES = [
  "320x100",
  "300x250",
  "320x50",
];

export function normalizeAdvertisementData(ad: any, allCategoriesData: any[] = []): AdvertisementForm {
  if (!ad) {
    const todayStr = new Date().toISOString().slice(0, 10);
    return {
      name: "",
      advertiser_name: "",
      media_type: "image",
      image_url: null,
      video_url: null,
      video_thumbnail: null,
      html_code: "",
      text_content: "",
      click_url: "",
      button_text: "",
      page: "home",
      section: "article_list",
      where: "after_article",
      category_id: null,
      article_id: null,
      tag_id: null,
      author_id: null,
      all_entities: false,
      article_number: 3,
      paragraph_number: null,
      size: "728x90",
      custom_width: null,
      custom_height: null,
      mobile_size: "",
      custom_mobile_width: null,
      custom_mobile_height: null,
      start_date: todayStr,
      end_date: "",
      start_time: "00:00",
      end_time: "23:59",
      status: "active",
      priority: 0,
      approved: true,
    };
  }

  const placementObj =
    ad?.placement && typeof ad.placement === "object" ? ad.placement : {};

  // 1. Creative Fields
  const name = ad?.name || ad?.title || "";
  const advertiser_name =
    ad?.advertiser_name ||
    ad?.advertiser ||
    ad?.brand_name ||
    ad?.advertiser_website ||
    "";

  let media_type = ad?.media_type || ad?.type || ad?.ad_type;
  if (!["image", "video", "html", "text"].includes(media_type)) {
    if (ad?.html_code || ad?.html) media_type = "html";
    else if (ad?.video_url || ad?.video) media_type = "video";
    else if (ad?.text_content || ad?.text) media_type = "text";
    else media_type = "image";
  }

  const image_url =
    ad?.image_url ||
    ad?.image ||
    ad?.file_path ||
    ad?.media?.file_path ||
    ad?.media?.url ||
    null;
  const video_url =
    ad?.video_url || ad?.video || ad?.video_path || ad?.media?.video_url || null;
  const video_thumbnail =
    ad?.video_thumbnail || ad?.thumbnail || ad?.poster || null;
  const html_code = ad?.html_code || ad?.html || "";
  const text_content = ad?.text_content || ad?.text || "";

  const click_url =
    ad?.click_url ||
    ad?.url ||
    ad?.target_url ||
    ad?.link_url ||
    ad?.redirect_url ||
    ad?.advertiser_website ||
    "";
  const button_text =
    ad?.button_text || ad?.cta || ad?.cta_text || ad?.button_label || "";

  // 2. Placement Page
  let page = ad?.page || placementObj.page || ad?.slot?.page;
  if (!page) {
    if (
      ad?.placement === "popup" ||
      ad?.section === "popup" ||
      ad?.where === "popup"
    ) {
      page = "home";
    } else if (ad?.category_id || (Array.isArray(ad?.categories) && ad.categories.length > 0)) {
      page = "category";
    } else if (ad?.article_id) {
      page = "single";
    } else if (ad?.tag_id) {
      page = "tag";
    } else if (ad?.author_id) {
      page = "author";
    } else {
      page = "home";
    }
  }

  // 3. Placement Section
  let section = ad?.section || placementObj.section || ad?.slot?.section || ad?.slot?.position;
  if (!section) {
    if (typeof ad?.placement === "string" && ad.placement.trim()) {
      const p = ad.placement.toLowerCase();
      if (p === "popup") section = "popup";
      else if (p === "header") section = "header";
      else if (p === "footer") section = "footer";
      else if (p === "sidebar") section = "sidebar";
      else if (p === "in_feed" || p === "banner") {
        section = page === "single" ? "article_content" : "article_list";
      } else {
        section = ad.placement;
      }
    } else if (ad?.where === "popup" || ad?.slot?.position_type === "popup") {
      section = "popup";
    } else if (page === "single") {
      section = "article_content";
    } else {
      section = "article_list";
    }
  }

  // 4. Placement Where
  let where =
    ad?.where ||
    placementObj.where ||
    ad?.slot?.position_type ||
    ad?.slot?.where ||
    ad?.where_position;
  if (!where) {
    if (section === "popup") where = "popup";
    else if (section === "header") where = "header";
    else if (section === "footer") where = "footer";
    else if (section === "sidebar") where = "sidebar_top";
    else if (page === "single") where = "after_paragraph";
    else where = "after_article";
  }

  // 5. Category resolution
  let targetCategoryId =
    ad?.category_id ??
    placementObj.category_id ??
    ad?.category?.id;

  if (targetCategoryId === undefined || targetCategoryId === null) {
    if (Array.isArray(ad?.categories) && ad.categories.length > 0) {
      const first = ad.categories[0];
      targetCategoryId = typeof first === "object" ? first.id : first;
    } else if (Array.isArray(ad?.target_category_ids) && ad.target_category_ids.length > 0) {
      targetCategoryId = ad.target_category_ids[0];
    }
  }

  const article_id =
    ad?.article_id ?? placementObj.article_id ?? ad?.article?.id ?? null;
  const tag_id =
    ad?.tag_id ??
    placementObj.tag_id ??
    ad?.tag?.id ??
    (Array.isArray(ad?.tags) && ad.tags[0]?.id ? ad.tags[0].id : null) ??
    null;
  const author_id =
    ad?.author_id ??
    placementObj.author_id ??
    ad?.author?.id ??
    (Array.isArray(ad?.authors) && ad.authors[0]?.id ? ad.authors[0].id : null) ??
    null;

  const all_entities = Boolean(
    ad?.all_entities ??
      placementObj.all_entities ??
      ad?.all_articles ??
      ad?.is_all_articles ??
      (page === "single" && !article_id)
  );

  const article_number =
    ad?.article_number ??
    placementObj.article_number ??
    ad?.slot?.article_position ??
    ad?.slot?.article_number ??
    ad?.slot?.position ??
    (where === "after_article" || where === "before_article" ? (ad?.position ?? 3) : null);

  const paragraph_number =
    ad?.paragraph_number ??
    placementObj.paragraph_number ??
    ad?.slot?.paragraph_position ??
    ad?.slot?.paragraph_number ??
    (where === "after_paragraph" || where === "before_paragraph" ? 3 : null);

  // 6. Sizes and Custom Dimensions
  let rawSize = ad?.size;
  if (!rawSize) {
    if (ad?.slot?.width && ad?.slot?.height) {
      rawSize = `${ad.slot.width}x${ad.slot.height}`;
    } else if (ad?.width && ad?.height) {
      rawSize = `${ad.width}x${ad.height}`;
    } else if (ad?.custom_width && ad?.custom_height) {
      rawSize = `${ad.custom_width}x${ad.custom_height}`;
    } else {
      rawSize = section === "popup" ? "600x400" : (section === "sidebar" ? "300x250" : "728x90");
    }
  }

  const sizeIsKnown = KNOWN_SIZES.includes(String(rawSize));
  const customSizeMatch = !sizeIsKnown && typeof rawSize === "string" ? rawSize.match(/^(\d+)x(\d+)$/i) : null;
  const size = sizeIsKnown ? rawSize : "custom";
  const custom_width = customSizeMatch
    ? Number(customSizeMatch[1])
    : (ad?.custom_width ? Number(ad.custom_width) : (size === "custom" && ad?.width ? Number(ad.width) : null));
  const custom_height = customSizeMatch
    ? Number(customSizeMatch[2])
    : (ad?.custom_height ? Number(ad.custom_height) : (size === "custom" && ad?.height ? Number(ad.height) : null));

  let rawMobileSize = ad?.mobile_size;
  if (!rawMobileSize) {
    if (ad?.slot?.mobile_width && ad?.slot?.mobile_height) {
      rawMobileSize = `${ad.slot.mobile_width}x${ad.slot.mobile_height}`;
    } else if (ad?.mobile_width && ad?.mobile_height) {
      rawMobileSize = `${ad.mobile_width}x${ad.mobile_height}`;
    } else if (ad?.custom_mobile_width && ad?.custom_mobile_height) {
      rawMobileSize = `${ad.custom_mobile_width}x${ad.custom_mobile_height}`;
    } else {
      rawMobileSize = "";
    }
  }

  const mobileSizeIsKnown = !rawMobileSize || rawMobileSize === "none" || KNOWN_MOBILE_SIZES.includes(String(rawMobileSize));
  const customMobileSizeMatch = !mobileSizeIsKnown && typeof rawMobileSize === "string" ? rawMobileSize.match(/^(\d+)x(\d+)$/i) : null;
  const mobile_size = mobileSizeIsKnown ? (rawMobileSize || "") : "custom";
  const custom_mobile_width = customMobileSizeMatch
    ? Number(customMobileSizeMatch[1])
    : (ad?.custom_mobile_width ? Number(ad.custom_mobile_width) : (mobile_size === "custom" && ad?.mobile_width ? Number(ad.mobile_width) : null));
  const custom_mobile_height = customMobileSizeMatch
    ? Number(customMobileSizeMatch[2])
    : (ad?.custom_mobile_height ? Number(ad.custom_mobile_height) : (mobile_size === "custom" && ad?.mobile_height ? Number(ad.mobile_height) : null));

  // 7. Dates & Times
  const todayStr = new Date().toISOString().slice(0, 10);
  const start_date = (ad?.start_date || ad?.starts_at)
    ? String(ad.start_date || ad.starts_at).slice(0, 10)
    : todayStr;
  const end_date = (ad?.end_date || ad?.ends_at)
    ? String(ad.end_date || ad.ends_at).slice(0, 10)
    : "";
  const start_time = (ad?.start_time || ad?.daily_start_time)
    ? String(ad.start_time || ad.daily_start_time).slice(0, 5)
    : "00:00";
  const end_time = (ad?.end_time || ad?.daily_end_time)
    ? String(ad.end_time || ad.daily_end_time).slice(0, 5)
    : "23:59";

  let status = ad?.status || "active";
  if (status === "pending") status = "pending_approval";
  if (status === "inactive") status = "paused";

  return {
    name,
    advertiser_name,
    media_type,
    image_url,
    video_url,
    video_thumbnail,
    html_code,
    text_content,
    click_url,
    button_text,
    page,
    section,
    where,
    category_id: targetCategoryId ?? null,
    article_id,
    tag_id,
    author_id,
    all_entities,
    article_number,
    paragraph_number,
    size,
    custom_width,
    custom_height,
    mobile_size,
    custom_mobile_width,
    custom_mobile_height,
    start_date,
    end_date,
    start_time,
    end_time,
    status,
    priority: ad?.priority ?? 0,
    approved: ad?.approved ?? true,
    id: ad?.id,
    slug: ad?.slug,
  };
}

export function useAdvertisementForm({ advertisement }: { advertisement?: any; type?: string }) {
  const defaultValues = normalizeAdvertisementData(advertisement);

  const formMethods = useForm<AdvertisementForm>({
    defaultValues,
  });

  return formMethods;
}

