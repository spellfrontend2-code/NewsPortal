import { useSettingHooks } from "@/features/settings/hooks/useSettings";
import {
  MapPin,
  Phone,
  PhoneCall,
  Mail,
  Globe,
} from "lucide-react";

function ContactUs() {
  const settingsHook=useSettingHooks();
  const {data:settings}=settingsHook.useFetchPublicSettings();
  const companyData=settings?.data||[];
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
                <h1 className="text-3xl  lg:text-4xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Contact Information
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Get in touch with us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Address */}
          <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <MapPin className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">Address</p>
              <p className="mt-1 font-semibold text-slate-900">
                {companyData?.address || "N/A"}
              </p>
            </div>
          </div>

          {/* Primary Phone */}
          <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <Phone className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Primary Phone
              </p>
              <a
                href={`tel:${companyData?.primary_phone}`}
                className="mt-1 block font-semibold text-slate-900 hover:underline"
              >
                {companyData?.primary_phone || "N/A"}
              </a>
            </div>
          </div>

          {/* Secondary Phone */}
          <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <Phone className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Secondary Phone
              </p>
              <a
                href={`tel:${companyData?.secondary_phone}`}
                className="mt-1 block font-semibold text-slate-900 hover:underline"
              >
                {companyData?.secondary_phone || "N/A"}
              </a>
            </div>
          </div>

          {/* Telephone */}
          <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <PhoneCall className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Telephone
              </p>
              <a
                href={`tel:${companyData?.telephone}`}
                className="mt-1 block font-semibold text-slate-900 hover:underline"
              >
                {companyData?.telephone || "N/A"}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <Mail className="h-5 w-5 text-slate-700" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">Email</p>
              <a
                href={`mailto:${companyData?.email}`}
                className="mt-1 block truncate font-semibold text-slate-900 hover:underline"
              >
                {companyData?.email || "N/A"}
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <Globe className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Social Media
              </p>

              <div className="mt-2 flex gap-3">
                {companyData?.social_links?.map((social: any) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold capitalize text-slate-900 hover:underline"
                  >
                  
                      <i className={social.icon} />
                  

                    

                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;