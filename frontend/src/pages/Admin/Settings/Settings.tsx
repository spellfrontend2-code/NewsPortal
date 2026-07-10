import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Link} from "lucide-react";
import SettingsForm from "@/features/settings/components/SettingsForm";
import { useSettingHooks } from "@/features/settings/hooks/useSettings";
import SettingsSkeleton from "@/features/settings/components/SettingSkeleton";

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
        {label}
      </span>
      <span
        className={`text-base ${
          value ? "text-black" : "italic text-[rgb(var(--color-gray-rgb)/0.5)]"
        }`}
      >
        {value || "Not set"}
      </span>
    </div>
  );
}

function ImagePreview({ label, src }: { label: string; src?: string }) {
  return (
    <div className="flex flex-col gap-2 w-[45%]">
      <span className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
        {label}
      </span>
      <div className="flex h-40 w-50 items-center justify-center rounded-md border border-[var(--color-secondary)] bg-[rgb(var(--color-gray-rgb)/0.03)]">
        {src ? (
          <img src={src} alt={label} className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-[rgb(var(--color-gray-rgb)/0.5)]">
            <ImageIcon size={18} />
            <span className="text-xs">Not uploaded</span>
          </div>
        )}
      </div>
    </div>
  );
}
function SocialLink({ label, href }: { label: string; href?: string }) {
  console.log(label);
  return (
     <div className="w-[1/3] flex items-center gap-2 border border-[var(--color-secondary)] rounded-md px-3 py-2">
              <Link size={16} className="text-[var(--color-primary)] shrink-0 " />
              {label && <span className="text-sm font-semibold border-r-1 text-gray-400 p-[0.8px] pr-2">{label}</span>}
              {label && href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-sm hover:underline w-full overflow-auto"
                >
                  {href}
                </a>
              ) : (
                <span className="text-sm italic text-[rgb(var(--color-gray-rgb)/0.5)]">
                  Not set
                </span>
              )}
            </div>
  );
}
function Settings() {
  const [editOpen, setEditOpen] = useState(false);
    const settingsHook = useSettingHooks();
const {data,isLoading}=settingsHook.useFetchSettings()
    const settings=data?.data??[]
console.log(settings.social_links);  
if (isLoading) {
    return <SettingsSkeleton />;
  }
  return (
   
    <div className="w-full flex flex-col gap-5 p-15">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-bold text-[var(--color-primary)] ">
            {settings?.name || " Settings"}
          </p>
          <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
            View and manage your site identity and details
          </p>
        </div>
        <Button variant="submit" onClick={() => setEditOpen(true)} className="w-[100px]">
          Edit
        </Button>
      </div>

      <div className="w-full flex flex-col gap-5 p-10 rounded-2xl border border-[var(--color-secondary)]">
        <div className="w-full flex justify-between">
          <ImagePreview label="Logo" src={settings?.logo} />
          <ImagePreview label="Favicon" src={settings?.favicon} />
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        <div className="w-full grid grid-cols-5 gap-5">
          <InfoRow label="Primary Phone" value={settings?.primary_phone} />
          <InfoRow label="Secondary Phone" value={settings?.secondary_phone} />
          <InfoRow label="Telephone" value={settings?.telephone} />
          <InfoRow label="Email" value={settings?.email} />
          <InfoRow label="Address" value={settings?.address} />
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        <div className="w-full flex flex-col gap-3">
          <span className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
            Social Links
          </span>
          <div className="w-full grid grid-cols-3 gap-5">
            {settings?.social_links?.map((social) => (
                <SocialLink key={social.id} label={social.platform} href={social.url} />
                
            ))}
            
           
          </div>
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        <div className="w-full grid grid-cols-3 gap-5">
          <InfoRow label="SEO Title" value={settings?.seo_title} />
          <InfoRow label="SEO Description" value={settings?.seo_description} />
          <InfoRow label="SEO Keywords" value={settings?.seo_keywords} />
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        <div className="w-full flex flex-col gap-3">
          <span className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
            Registration Details
          </span>
          <div className="w-full grid grid-cols-3 gap-5">
            <InfoRow
              label="Press Registration No."
              value={settings?.press_registration_number}
            />
            <InfoRow
              label="Company Registration No."
              value={settings?.company_registration_number}
            />
            <InfoRow label="VAT Number" value={settings?.vat_number} />
          </div>
        </div>
      </div>

      <SettingsForm open={editOpen} setOpen={setEditOpen} settings={settings} />
    </div>
  );
}

export default Settings;