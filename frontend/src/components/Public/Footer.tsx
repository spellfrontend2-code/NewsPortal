import { useSettingHooks } from "@/features/settings/hooks/useSettings";
import { Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  const settingHook = useSettingHooks();

  const { data: companyData, isLoading } = settingHook.useFetchPublicSettings();

  const company = companyData?.data ?? companyData;

  if (isLoading) return null;

  return (
    <div className="w-full bg-[var(--color-public-primary)] text-white flex justify-center">
      <footer className="  w-[80%]">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <div className="space-y-5">
          {company?.logo && (
            <img
              src={company.logo}
              alt={company.name}
              className="h-16 w-auto object-contain"
            />
          )}

          <p className="text-xl font-bold">{company?.name}</p>

          <p className="text-sm leading-6 text-gray-300">
            Your trusted source for the latest news, updates, and stories.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {company?.social_links?.map((social: any, index: number) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 transition hover:bg-white/10 hover:text-public-newsText"
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>
        </div>
        {/* Contact Information */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact Us</h3>

          <div className="space-y-4 text-sm text-gray-300">
            {company?.address && (
              <div className="flex gap-3">
                <MapPin className="mt-1 shrink-0" size={18} />
                <span>{company.address}</span>
              </div>
            )}

            {company?.email && (
              <div className="flex gap-3">
                <Mail className="mt-1 shrink-0" size={18} />

                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-white"
                >
                  {company.email}
                </a>
              </div>
            )}

            {(company?.primary_phone ||
              company?.secondary_phone ||
              company?.telephone) && (
              <div className="flex gap-3">
                <Phone className="mt-1 shrink-0" size={18} />

                <div className="flex flex-col gap-1">
                  {company?.primary_phone && (
                    <a
                      href={`tel:${company.primary_phone}`}
                      className="hover:text-white"
                    >
                      {company.primary_phone}
                    </a>
                  )}

                  {company?.secondary_phone && (
                    <a
                      href={`tel:${company.secondary_phone}`}
                      className="hover:text-white"
                    >
                      {company.secondary_phone}
                    </a>
                  )}

                  {company?.telephone && (
                    <a
                      href={`tel:${company.telephone}`}
                      className="hover:text-white"
                    >
                      {company.telephone}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <a href="/" className="transition hover:text-white">
                Home
              </a>
            </li>

            <li>
              <a
                href="/news-list/latest-news"
                className="transition hover:text-white"
              >
                Latest News
              </a>
            </li>

            <li>
              <a href="/about-us" className="transition hover:text-white">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact-us" className="transition hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        {/* Registration Information */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Legal Information</h3>

          <div className="space-y-4 text-sm text-gray-300">
            {company?.press_registration_number && (
              <div>
                <p className="font-medium text-white">Press Registration No.</p>

                <p>{company.press_registration_number}</p>
              </div>
            )}

            {company?.company_registration_number && (
              <div>
                <p className="font-medium text-white">
                  Company Registration No.
                </p>

                <p>{company.company_registration_number}</p>
              </div>
            )}

            {company?.vat_number && (
              <div>
                <p className="font-medium text-white">VAT No.</p>

                <p>{company.vat_number}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} {company?.name}. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="/terms-and-conditions" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
