import { useForm } from "react-hook-form";
import type { AdvertisementForm } from "../types/advertisement";
import { toDateTimeLocal } from "@/features/articles/utils/toDateTimeLocal";

export function useAdvertisementForm({ advertisement, type }: any) {
  const startsAt = toDateTimeLocal(advertisement?.starts_at);
  const endsAt = toDateTimeLocal(advertisement?.ends_at);
  const { register, handleSubmit, watch, setValue, control } =
    useForm<AdvertisementForm>({
      defaultValues: {
        title: advertisement?.title || "",
        advertiser_name: advertisement?.advertiser_name || "",
        advertiser_email: advertisement?.advertiser_email || "",
        advertiser_website: advertisement?.advertiser_website || "",
        ad_type: advertisement?.ad_type || "image",

        image_url: advertisement?.image_url || null,
        video_url: advertisement?.video_url || null,
        video_thumbnail: advertisement?.video_thumbnail || null,

        html_code: advertisement?.html_code || "",
        text_content: advertisement?.text_content || "",

        target_url: advertisement?.target_url || "",
        target_blank: advertisement?.target_blank || "_self",
        cta_text: advertisement?.cta_text || "",

        placement: advertisement?.placement || "header_banner",

        target_countries: advertisement?.target_countries || [],
        target_devices: advertisement?.target_devices || [],
        target_audiences: advertisement?.target_audiences || [],

        starts_at: (advertisement?.starts_at && startsAt) || "",
        ends_at: (advertisement?.ends_at && endsAt) || "",
        daily_start_time: advertisement?.daily_start_time
          ? advertisement.daily_start_time.slice(0, 5)
          : "",

        daily_end_time: advertisement?.daily_end_time
          ? advertisement.daily_end_time.slice(0, 5)
          : "",

        pricing_model: advertisement?.pricing_model || "cpc",
        price: advertisement?.price || "",
        daily_budget: advertisement?.daily_budget || "",
        total_budget: advertisement?.total_budget || "",

        priority: advertisement?.priority ?? null,
        status: advertisement?.status || "active",
      },
    });

  return { register, handleSubmit, watch, setValue, control };
}
