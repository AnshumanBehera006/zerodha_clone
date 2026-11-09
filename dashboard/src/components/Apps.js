import React from "react";

const zerodhaApps = [
  {
    name: "Kite",
    tagline: "Trading platform for stocks, F&O, and IPOs",
    url: "https://kite.zerodha.com",
    badgeColor: "#ea5b0c",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea5b0c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
        <polyline points="2 15.5 12 22 22 15.5" />
      </svg>
    ),
  },
  {
    name: "Coin",
    tagline: "Commission-free direct mutual funds and NPS",
    url: "https://coin.zerodha.com",
    badgeColor: "#059669",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H10.5a1.5 1.5 0 0 0 0 3H15" />
      </svg>
    ),
  },
  {
    name: "Console",
    tagline: "Central dashboard, P&L reports, and analytics",
    url: "https://console.zerodha.com",
    badgeColor: "#387ed1",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#387ed1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 16V10M12 16V7M17 16V13" />
      </svg>
    ),
  },
  {
    name: "Varsity",
    tagline: "Stock market and financial education modules",
    url: "https://zerodha.com/varsity",
    badgeColor: "#8b5cf6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10M6 10h10" />
      </svg>
    ),
  },
  {
    name: "Kite Connect",
    tagline: "APIs for algorithmic and programmatic trading",
    url: "https://kite.trade",
    badgeColor: "#f59e0b",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const Apps = () => {
  return (
    <section style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", color: "#1f2937", marginBottom: "4px" }}>Zerodha Apps</h1>
        <p style={{ color: "#6b7280", margin: 0, fontSize: "0.95rem" }}>
          Click an app to open it directly in a new tab.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {zerodhaApps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              textDecoration: "none",
              color: "inherit",
              background: "#ffffff",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = app.badgeColor;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f9fafb",
                border: "1px solid #f3f4f6",
              }}
            >
              {app.icon}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#111827" }}>
                  {app.name}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>↗</span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "0.825rem", color: "#6b7280", lineHeight: "1.3" }}>
                {app.tagline}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Apps;