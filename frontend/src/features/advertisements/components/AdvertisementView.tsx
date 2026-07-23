import { Controller, useForm } from "react-hook-form";
import { useAdvertisementHooks } from "../hooks/useAdvertisements";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toDateTimeLocal } from "@/features/articles/utils/toDateTimeLocal";

type Advertisement = any;

interface Props {
  advertisement: Advertisement;
}

function Field({ label, value }: { label: string; value?: any }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
        {label}
      </p>
      <p className="text-sm text-slate-800 break-words">
        {value ?? "-"}
      </p>
    </div>
  );
}

export default function AdvertisementView({ advertisement }: Props) {
  if (!advertisement) return null;

  // const advertisementHook = useAdvertisementHooks();

  // const statuses = [
  //   { name: "Active", value: "active" },
  //   { name: "Paused", value: "paused" },
  //   { name: "Pending", value: "pending" },
  //   { name: "Expired", value: "expired" },
  //   { name: "Completed", value: "completed" },
  //   { name: "Rejected", value: "rejected" },
  //   { name: "Draft", value: "draft" },
  // ];

  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     status: advertisement?.status || "pending",
  //   },
  // });

  // const updateStatus = advertisementHook.useUpdateAdvertisementStatus();

  // const onSubmit = (data: any) => {
  //   updateStatus.mutate(
  //     { id: advertisement.id, data },
  //     {
  //       onSuccess: (res) => {
  //         toast.success(res?.message || "Status updated successfully");
  //       },
  //       onError: (err) => {
  //         toast.error(err?.message || "Something went wrong");
  //       },
  //     }
  //   );
  // };
console.log("ADTYPE",advertisement.ad_type)
  return (
    <div className="border border-slate-200 rounded-2xl max-w-5xl mx-auto p-6 space-y-6 bg-slate-50 shadow-sm">
      {/* <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="text-[11px] text-black uppercase tracking-wider font-bold">
            Status
          </label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={inputStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Button
          type="button"
          variant="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={updateStatus.isPending}
          className="rounded-md"
        >
          {updateStatus.isPending ? "Updating..." : "Update status"}
        </Button>
      </div> */}

      {/* HEADER */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <Field label="Title" value={advertisement.title} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <Field label="Status" value={advertisement.status} />
          <Field label="Ad Type" value={advertisement.ad_type} />
          <Field label="Placement" value={advertisement.placement} />
          <Field label="Priority" value={advertisement.priority} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <Field
            label="Approved"
            value={advertisement.approved ? "Yes" : "No"}
          />
        </div>
      </div>

      {/* ADVERTISER */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black mb-1">
          Advertiser Information
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Advertiser Name" value={advertisement.advertiser_name} />
          <Field label="Advertiser Email" value={advertisement.advertiser_email} />
          <Field label="Advertiser Website" value={advertisement.advertiser_website} />
        </div>
      </div>

      {/* MEDIA */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Media Information
        </h2>

        {((advertisement.ad_type === "image" || advertisement.ad_type === "native") && advertisement.image_url) && (
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Image
            </p>
            <img
              src={advertisement.image_url}
              className="rounded-xl max-h-[400px] object-cover w-full border border-slate-200"
            />
          </div>
        )}

        {(advertisement.ad_type === "video" && advertisement.video_url) && (
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Video
            </p>
            <video
              src={advertisement.video_url}
              className="rounded-xl max-h-[400px] object-cover w-full border border-slate-200"
              controls
            />
          </div>
        )}

        {(advertisement.ad_type === "video" && advertisement.video_thumbnail) && (
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Video Thumbnail
            </p>
            <img
              src={advertisement.video_thumbnail}
              className="rounded-xl max-h-[400px] object-cover w-full border border-slate-200"
            />
          </div>
        )}

        {(advertisement.ad_type === "html" && advertisement.html_code) && (
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              HTML Code
            </p>
            <pre className="text-xs bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap break-words">
              {advertisement.html_code}
            </pre>
          </div>
        )}

        {(advertisement.ad_type === "text" || advertisement.ad_type === "native") && <Field label="Text Content" value={advertisement.text_content} />}
      </div>

      {/* CALL TO ACTION */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Call To Action
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Target URL" value={advertisement.target_url} />
          <Field label="Target Blank" value={advertisement.target_blank} />
         {advertisement?.ad_type==="native" && <Field label="CTA Text" value={advertisement.cta_text} />}
        </div>
      </div>

      {/* TARGETING */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Targeting Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field
            label="Target Countries"
            value={
              advertisement.target_countries?.length
                ? advertisement.target_countries.join(", ")
                : "-"
            }
          />
          <Field
            label="Target Devices"
            value={
              advertisement.target_devices?.length
                ? advertisement.target_devices.join(", ")
                : "-"
            }
          />
          <Field
            label="Target Audiences"
            value={
              advertisement.target_audiences?.length
                ? advertisement.target_audiences.join(", ")
                : "-"
            }
          />
        </div>
      </div>

      {/* SCHEDULE */}
      <div className="rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black">
          Schedule
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field
            label="Starts At"
            value={
              advertisement.starts_at
                ? toDateTimeLocal(advertisement.starts_at).replace("T", " ")
                : "-"
            }
          />
          <Field
            label="Ends At"
            value={
              advertisement.ends_at
                ? toDateTimeLocal(advertisement.ends_at).replace("T", " ")
                : "-"
            }
          />
          <Field
            label="Daily Start Time"
            value={
              advertisement.daily_start_time
                ? advertisement.daily_start_time.slice(0, 5)
                : "-"
            }
          />
          <Field
            label="Daily End Time"
            value={
              advertisement.daily_end_time
                ? advertisement.daily_end_time.slice(0, 5)
                : "-"
            }
          />
        </div>
      </div>

      {/* PRICING */}
      <div className="rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-black mb-4">
          Pricing Information
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field label="Pricing Model" value={advertisement.pricing_model} />
          <Field label="Price" value={advertisement.price} />
          <Field label="Daily Budget" value={advertisement.daily_budget} />
          <Field label="Total Budget" value={advertisement.total_budget} />
        </div>
      </div>
    </div>
  );
}