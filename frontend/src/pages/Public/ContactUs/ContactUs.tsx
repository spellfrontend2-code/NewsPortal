import { useSettingHooks } from "@/features/settings/hooks/useSettings";
import { MapPin, Phone, PhoneCall, Mail, Globe } from "lucide-react";
import ContactUsSkeleton from "./ContactUsSkeleton";

function ContactUs() {
  const settingsHook = useSettingHooks();
  const { data: settings, isLoading } = settingsHook.useFetchPublicSettings();
  const companyData = settings?.data || [];

  if (isLoading) {
    return <ContactUsSkeleton />;
  }

  const cards = [
    {
      id: "address",
      icon: MapPin,
      label: "Address",
      content: companyData?.address || "N/A",
      href: null,
    },
    {
      id: "primary-phone",
      icon: Phone,
      label: "Primary Phone",
      content: companyData?.primary_phone || "N/A",
      href: companyData?.primary_phone ? `tel:${companyData.primary_phone}` : null,
    },
    {
      id: "secondary-phone",
      icon: PhoneCall,
      label: "Secondary Phone",
      content: companyData?.secondary_phone || "N/A",
      href: companyData?.secondary_phone ? `tel:${companyData.secondary_phone}` : null,
    },
    {
      id: "telephone",
      icon: Phone,
      label: "Telephone",
      content: companyData?.telephone || "N/A",
      href: companyData?.telephone ? `tel:${companyData.telephone}` : null,
    },
    {
      id: "email",
      icon: Mail,
      label: "Email",
      content: companyData?.email || "N/A",
      href: companyData?.email ? `mailto:${companyData.email}` : null,
      truncate: true,
    },
  ];

  return (
    <section className=" px-4">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <span
            className="inline-block mb-3 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: "var(--color-public-bg-dark)",
              color: "var(--color-public-text-inverse)",
            }}
          >
            Get in Touch
          </span>
          <h1
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "var(--color-public-text-main)" }}
          >
            Contact Information
          </h1>
          <p
            className="mt-3 text-sm max-w-md mx-auto"
            style={{ color: "var(--color-public-text-tertiary)" }}
          >
            Reach us through any of the channels below. We're happy to hear from you.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ id, icon: Icon, label, content, href, truncate }) => (
            <div
              key={id}
              className="group flex items-start gap-4 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--color-public-bg-main)",
                border: "1px solid var(--color-public-border-main)",
                boxShadow: "0 1px 4px 0 rgba(34,96,191,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 16px 0 rgba(34,96,191,0.13)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-public-border-dark)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 1px 4px 0 rgba(34,96,191,0.06)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-public-border-main)";
              }}
            >
              {/* Icon bubble */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                style={{
                  background: "var(--color-public-bg-tertiary)",
                  color: "var(--color-public-bg-dark)",
                }}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className={truncate ? "min-w-0 flex-1" : "flex-1"}>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-public-text-tertiary)" }}
                >
                  {label}
                </p>

                {href ? (
                  <a
                    href={href}
                    className={`mt-1 block font-semibold transition-colors duration-150 ${truncate ? "truncate" : ""}`}
                    style={{ color: "var(--color-public-text-accent)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-public-text-accent-hover)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-public-text-accent)")
                    }
                  >
                    {content}
                  </a>
                ) : (
                  <p
                    className="mt-1 font-semibold"
                    style={{ color: "var(--color-public-text-secondary)" }}
                  >
                    {content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Social Media Card */}
          {companyData?.social_links?.length > 0 && (
            <div
              className="flex items-start gap-4 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--color-public-bg-main)",
                border: "1px solid var(--color-public-border-main)",
                boxShadow: "0 1px 4px 0 rgba(34,96,191,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 16px 0 rgba(34,96,191,0.13)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-public-border-dark)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 1px 4px 0 rgba(34,96,191,0.06)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-public-border-main)";
              }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "var(--color-public-bg-tertiary)",
                  color: "var(--color-public-bg-dark)",
                }}
              >
                <Globe className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-public-text-tertiary)" }}
                >
                  Social Media
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {companyData.social_links.map((social: any) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all duration-150"
                      style={{
                        background: "var(--color-public-bg-tertiary)",
                        color: "var(--color-public-text-accent)",
                        border: "1px solid var(--color-public-border-dark)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "var(--color-public-bg-dark)";
                        el.style.color = "var(--color-public-text-inverse)";
                        el.style.borderColor = "var(--color-public-bg-dark)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.background = "var(--color-public-bg-tertiary)";
                        el.style.color = "var(--color-public-text-accent)";
                        el.style.borderColor = "var(--color-public-border-dark)";
                      }}
                    >
                      <i className={social.icon} />
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactUs;