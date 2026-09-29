import type { ReactNode } from "react";

function IconUsers() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 text-accent"
    >
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
      <path d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299" />
      <path d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 text-accent"
    >
      <path d="M16 18L22 12L16 6" />
      <path d="M8 6L2 12L8 18" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 text-accent"
    >
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 text-accent"
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M16.24 7.75977L14.12 14.1198L7.76001 16.2398L9.88001 9.87977L16.24 7.75977Z" />
    </svg>
  );
}

const VALUES: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Customer First",
    description: "Starts with the people using it.",
    icon: <IconUsers />,
  },
  {
    title: "Build in the Open",
    description: "Roadmap and docs are public.",
    icon: <IconCode />,
  },
  {
    title: "Trust by Default",
    description: "Secure and private by design.",
    icon: <IconShield />,
  },
  {
    title: "Think Long Term",
    description: "We plan in decades, not quarters.",
    icon: <IconCompass />,
  },
];

export function AboutMissionSection() {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl leading-[1.2] font-bold text-neutral-950">
          Our Mission
        </h2>
        <p className="text-xs leading-[1.2] tracking-[-0.02em] text-neutral-950">
          to make cutting-edge technology accessible, reliable, and enjoyable for everyday users. With a team of more than 500 engineers, designers, and support professionals, we invest heavily in research and development to stay at the forefront of industry trends.
        </p>
        <p className="text-xs leading-[1.25] text-neutral-600">
          We remove the friction between a good idea and a shipped product, for
          every team, at every size.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
              {value.icon}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] text-neutral-950">
                {value.title}
              </h3>
              <p className="text-sm leading-[1.5] text-neutral-600">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
