import { useSettingHooks } from "@/features/settings/hooks/useSettings";
import { Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  const settingHook = useSettingHooks();

  const { data: companyData, isLoading } = settingHook.useFetchPublicSettings();

  const company = companyData?.data ?? companyData;

  if (isLoading) return null;

  return (
    <div className="w-full bg-[var(--color-public-bg-darker)] text-slate-100 flex justify-center ">
      <footer className="w-[80%]">
        {/* Main Footer */}
        <div className="mx-auto grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            {company?.logo && (
              <img
                src={company.logo}
                alt={company.name}
                className="h-12 w-auto object-contain brightness-95"
              />
            )}

            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-public-text-inverse)]">{company?.name}</p>

            <p className="text-sm leading-relaxed text-[var(--color-public-text-lighter)] font-normal">
              Your trusted source for the latest news, updates, and stories.
            </p>

            {/* Social Links */}
            {company?.social_links?.length > 0 && <div className="flex gap-2.5">
              {company?.social_links?.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-public-border-darker)] bg-[var(--color-public-bg-dark)]/50 text-[var(--color-public-text-lighter)] transition-all hover:bg-[var(--color-public-bg-dark-secondary)] hover:text-[var(--color-public-text-inverse)] hover:scale-105"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm sm:text-base   font-bold tracking-wider uppercase text-[var(--color-public-text-lighter)]">Contact Us</h3>

            <div className="space-y-4 text-sm text-[var(--color-public-text-lighter)]">
              {company?.address && (
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-[var(--color-public-text-muted)]" size={16} />
                  <span className="leading-relaxed">{company.address}</span>
                </div>
              )}

              {company?.email && (
                <div className="flex gap-3">
                  <Mail className="mt-0.5 shrink-0 text-[var(--color-public-text-muted)]" size={16} />
                  <a
                    href={`mailto:${company.email}`}
                    className="hover:text-[var(--color-public-text-inverse)] transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              )}

              {(company?.primary_phone ||
                company?.secondary_phone ||
                company?.telephone) && (
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 shrink-0 text-[var(--color-public-text-muted)]" size={16} />

                    <div className="flex flex-col gap-1.5">
                      {company?.primary_phone && (
                        <a
                          href={`tel:${company.primary_phone}`}
                          className="hover:text-[var(--color-public-text-inverse)] transition-colors"
                        >
                          {company.primary_phone}
                        </a>
                      )}

                      {company?.secondary_phone && (
                        <a
                          href={`tel:${company.secondary_phone}`}
                          className="hover:text-[var(--color-public-text-inverse)] transition-colors"
                        >
                          {company.secondary_phone}
                        </a>
                      )}

                      {company?.telephone && (
                        <a
                          href={`tel:${company.telephone}`}
                          className="hover:text-[var(--color-public-text-inverse)] transition-colors"
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
          <div className="flex flex-col gap-5">
            <h3 className="text-sm sm:text-base   font-bold tracking-wider uppercase text-[var(--color-public-text-lighter)]">Quick Links</h3>

            <ul className="space-y-3 text-sm text-[var(--color-public-text-lighter)]">
              <li>
                <a href="/" className="transition-colors hover:text-[var(--color-public-text-inverse)]">
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/news-list/latest-news"
                  className="transition-colors hover:text-[var(--color-public-text-inverse)]"
                >
                  Latest News
                </a>
              </li>

             

              <li>
                <a href="/contact-us" className="transition-colors hover:text-[var(--color-public-text-inverse)]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Registration Information */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm sm:text-base   font-bold tracking-wider uppercase text-[var(--color-public-text-lighter)]">Legal Info</h3>

            <div className="space-y-4 text-sm tracking-wider text-[var(--color-public-text-lighter)]">
              {company?.press_registration_number && (
                <div>
                  <p className="font-semibold text-slate-350 text-sm">Press Registration No.</p>
                  <p className="text-xs text-slate-450 mt-0.5">{company.press_registration_number}</p>
                </div>
              )}

              {company?.company_registration_number && (
                <div>
                  <p className="font-semibold text-slate-350 text-sm">
                    Company Registration No.
                  </p>
                  <p className="text-xs text-slate-450 mt-0.5">{company.company_registration_number}</p>
                </div>
              )}

              {company?.vat_number && (
                <div>
                  <p className="font-semibold text-slate-350 text-sm">VAT No.</p>
                  <p className="text-xs text-slate-455 mt-0.5">{company.vat_number}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--color-public-border-light)] py-6">
          <div className="mx-auto flex flex-col items-center justify-between gap-3 text-xs text-[var(--color-public-text-muted)] md:flex-row">
            <p>
              © {new Date().getFullYear()} {company?.name}. All rights reserved.
            </p>

            <div className="flex gap-4">
              <a href="/privacy-policy" className="hover:text-[var(--color-public-text-lightest)] transition-colors">
                Privacy Policy
              </a>

              <a href="/terms-and-conditions" className="hover:text-[var(--color-public-text-lightest)] transition-colors">
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
