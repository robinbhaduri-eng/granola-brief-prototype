type ChartArtifactProps = {
  mode: "preview" | "embedded";
};

export function ChartArtifact({ mode }: ChartArtifactProps) {
  const isPreview = mode === "preview";

  return (
    <div
      className={`relative overflow-hidden ${
        isPreview
          ? "h-[86px] w-[132px] rounded-[18px]"
          : "h-[286px] w-full rounded-[26px]"
      } border border-[var(--color-border-primary)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(247,247,242,0.98)_100%)] shadow-[var(--shadow-subtle)]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,140,21,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(71,67,42,0.08),transparent_32%)]" />

      <div className={`relative h-full w-full ${isPreview ? "scale-[1.06] blur-[1.2px] saturate-75" : ""}`}>
        {!isPreview ? (
          <div className="flex items-center justify-between border-b border-[var(--color-border-primary)] px-5 py-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-foreground-tertiary)]">
                Shared chart
              </div>
              <div className="mt-0.5 text-[13px] font-semibold text-[var(--color-foreground-strong)]">
                Q3 retention trend
              </div>
            </div>

            <div className="rounded-full bg-[var(--color-background-window)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-foreground-secondary)]">
              Aug spike
            </div>
          </div>
        ) : null}

        <div className={`${isPreview ? "px-3 py-3" : "px-5 py-5"}`}>
          <svg
            viewBox="0 0 520 250"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#788c15" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#788c15" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {[36, 86, 136, 186].map((y) => (
              <line
                key={y}
                x1="20"
                y1={y}
                x2="500"
                y2={y}
                stroke="rgba(71,67,42,0.09)"
                strokeDasharray="5 7"
              />
            ))}

            {[20, 116, 212, 308, 404, 500].map((x) => (
              <line
                key={x}
                x1={x}
                y1="20"
                x2={x}
                y2="210"
                stroke="rgba(71,67,42,0.06)"
              />
            ))}

            <path
              d="M20 168C72 150 116 142 164 138C212 133 250 156 308 171C366 186 402 90 500 78V210H20V168Z"
              fill="url(#areaGradient)"
            />

            <path
              d="M20 168C72 150 116 142 164 138C212 133 250 156 308 171C366 186 402 90 500 78"
              stroke="#788c15"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M20 152C64 141 102 137 154 141C208 146 248 136 300 124C352 112 400 120 500 116"
              stroke="rgba(41,41,41,0.18)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="404" cy="90" r="14" fill="rgba(120,140,21,0.18)" />
            <circle cx="404" cy="90" r="8" fill="#788c15" />
            <circle cx="404" cy="90" r="3" fill="#fcfcf8" />

            <text
              x="388"
              y="54"
              fill="#5b6f00"
              fontSize="14"
              fontWeight="600"
              fontFamily="var(--font-body)"
            >
              August
            </text>

            {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((month, index) => (
              <text
                key={month}
                x={20 + index * 96}
                y="238"
                fill="rgba(114,114,110,0.9)"
                fontSize="13"
                fontWeight="500"
                fontFamily="var(--font-body)"
              >
                {month}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
