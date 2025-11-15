import React from "react";

const Apps = () => {
  const cards = [
    { title: "Paper Trading", desc: "Simulate trades without real money", route: "/apps/paper" },
    { title: "Market Screener", desc: "Filter stocks by volume, pct change, sector", route: "/apps/screener" },
    { title: "Strategy Builder", desc: "Save custom order presets & strategies", route: "/apps/strategy" },
    { title: "News & Research", desc: "Latest market news & company data", route: "/apps/news" },
    { title: "Import Watchlist", desc: "Import tickers from CSV", route: "/apps/import" },
    { title: "Quick Chart", desc: "Small chart view for any symbol", route: "/apps/chart" },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: 0, fontSize: 22, color: "#2b2b2b", fontWeight: 600 }}>Apps</h2>
      <p style={{ color: "#666", marginTop: 6 }}>Useful tools and shortcuts to extend your trading workflow.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 12,
        }}
      >
        {cards.map((c) => (
          <div
            key={c.title}
            style={{
              padding: 16,
              border: "1px solid #e6e6e6",
              borderRadius: 8,
              background: "#fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 120,
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 8px 0" }}>{c.title}</h3>
              <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{c.desc}</p>
            </div>

            <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn btn-sm"
                onClick={() => {}}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: "#1976d2",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;