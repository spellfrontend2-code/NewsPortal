import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
const inputStyle =
  "border border-[var(--color-secondary)] px-2 py-1 rounded-md w-full focus:outline-none";

type AdvertisementForm = {
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

export default function AddAdvertisement({ setOpen, type }: any) {
  const { register, handleSubmit, watch } = useForm<AdvertisementForm>({
    defaultValues: {
      title: "",
      advertiser_name: "",
      advertiser_email: "",
      advertiser_website: "",
      ad_type: "image",

      image_url: null,
      video_url: null,
      video_thumbnail: null,

      html_code: "",
      text_content: "",

      target_url: "",
      target_blank: "_blank",
      cta_text: "",

      placement: "",

      target_categories_ids: [],
      target_tags_ids: [],

      target_countries: [],
      target_devices: [],
      target_audiences: [],

      starts_at: "",
      ends_at: "",
      daily_start_time: "",
      daily_end_time: "",

      pricing_model: "cpc",
      price: "",
      daily_budget: "",
      total_budget: "",

      priority: null,

      status: "active",
      approved: null,
    },
  });

  const onSubmit = (data: AdvertisementForm) => {
    console.log(data);
  };

  return (
    <div>
           <div>
        <Button variant="submit" onClick={() => setOpen(false)}>
          <ArrowLeft />
        </Button>
        <p className="text-2xl font-bold text-[var(--color-primary)]">
          {type === "edit" ? "Edit  Advertisement":type==="view"?"View  Advertisement" : "Add  Advertisement"}
        </p>
        <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
          {type === "edit"
            ? "Edit an existing  advertisement.":type==="view"?"View an existing  advertisement."
            : "Create a new  advertisement."}
        </p>
      </div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* TITLE */}
      <div>
        <label>Title</label>
        <input {...register("title")} className={inputStyle} />
      </div>

      {/* ADVERTISER NAME */}
      <div>
        <label>Advertiser Name</label>
        <input {...register("advertiser_name")} className={inputStyle} />
      </div>

      {/* EMAIL */}
      <div>
        <label>Advertiser Email</label>
        <input
          type="email"
          {...register("advertiser_email")}
          className={inputStyle}
        />
      </div>

      {/* WEBSITE */}
      <div>
        <label>Advertiser Website</label>
        <input {...register("advertiser_website")} className={inputStyle} />
      </div>

      {/* AD TYPE */}
      <div>
        <label>Ad Type</label>
        <select {...register("ad_type")} className={inputStyle}>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="html">HTML</option>
          <option value="text">Text</option>
        </select>
      </div>

      {/* IMAGE */}
      <div>
        <label>Image</label>
        <input type="file" className={inputStyle} />
      </div>

      {/* VIDEO */}
      <div>
        <label>Video</label>
        <input type="file" className={inputStyle} />
      </div>

      {/* THUMBNAIL */}
      <div>
        <label>Video Thumbnail</label>
        <input type="file" className={inputStyle} />
      </div>

      {/* HTML */}
      <div>
        <label>HTML Code</label>
        <textarea {...register("html_code")} className={inputStyle} />
      </div>

      {/* TEXT CONTENT */}
      <div>
        <label>Text Content</label>
        <textarea {...register("text_content")} className={inputStyle} />
      </div>

      {/* TARGET URL */}
      <div>
        <label>Target URL</label>
        <input {...register("target_url")} className={inputStyle} />
      </div>

      {/* TARGET BLANK */}
      <div>
        <label>Open In</label>
        <select {...register("target_blank")} className={inputStyle}>
          <option value="_self">Same Tab</option>
          <option value="_blank">New Tab</option>
        </select>
      </div>

      {/* CTA */}
      <div>
        <label>CTA Text</label>
        <input {...register("cta_text")} className={inputStyle} />
      </div>

      {/* PLACEMENT */}
      <div>
        <label>Placement</label>
        <input {...register("placement")} className={inputStyle} />
      </div>

      {/* TARGETING */}
      <div>
        <label>Countries</label>
        <input {...register("target_countries.0")} className={inputStyle} />
      </div>

      <div>
        <label>Devices</label>
        <input {...register("target_devices.0")} className={inputStyle} />
      </div>

      <div>
        <label>Audiences</label>
        <input {...register("target_audiences.0")} className={inputStyle} />
      </div>

      {/* SCHEDULE */}
      <div>
        <label>Start Date</label>
        <input type="datetime-local" {...register("starts_at")} className={inputStyle} />
      </div>

      <div>
        <label>End Date</label>
        <input type="datetime-local" {...register("ends_at")} className={inputStyle} />
      </div>

      <div>
        <label>Daily Start Time</label>
        <input type="time" {...register("daily_start_time")} className={inputStyle} />
      </div>

      <div>
        <label>Daily End Time</label>
        <input type="time" {...register("daily_end_time")} className={inputStyle} />
      </div>

      {/* PRICING */}
      <div>
        <label>Pricing Model</label>
        <select {...register("pricing_model")} className={inputStyle}>
          <option value="cpc">CPC</option>
          <option value="cpm">CPM</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      <div>
        <label>Price</label>
        <input type="number" {...register("price")} className={inputStyle} />
      </div>

      <div>
        <label>Daily Budget</label>
        <input type="number" {...register("daily_budget")} className={inputStyle} />
      </div>

      <div>
        <label>Total Budget</label>
        <input type="number" {...register("total_budget")} className={inputStyle} />
      </div>

      {/* PRIORITY */}
      <div>
        <label>Priority</label>
        <input type="number" {...register("priority")} className={inputStyle} />
      </div>

      {/* STATUS */}
      <div>
        <label>Status</label>
        <select {...register("status")} className={inputStyle}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* APPROVAL */}
      <div>
        <label>Approval</label>
        <select {...register("approved")} className={inputStyle}>
          <option value="">Pending</option>
          <option value="true">Approved</option>
          <option value="false">Rejected</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md"
      >
        Save Advertisement
      </button>
    </form></div>
  );
}