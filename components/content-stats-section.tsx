const STATS = [
  { value: "99.99%", label: "Uptime across all regions" },
  { value: "12,000+", label: "Companies run on Meridian" },
  { value: "48ms", label: "Median API response time" },
];

export function ContentStatsSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
            Trusted in production
          </h2>
          <p className="text-base leading-[1.6] text-neutral-600">
            The numbers our customers hold us to.
          </p>
        </div>
        {/* Figma pins this row to 200px; the cards hug 137px and stay top-aligned */}
        <div className="grid w-full grid-cols-1 gap-8 lg:h-[200px] lg:grid-cols-3 lg:items-start">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col gap-2 rounded-xl border border-neutral-200 p-6"
            >
              <p className="text-5xl leading-[1.1] font-bold tracking-[-0.02em] text-neutral-950">
                {stat.value}
              </p>
              <p className="text-base leading-[1.6] text-neutral-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
