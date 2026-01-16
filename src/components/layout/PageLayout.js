export default function PageLayout({ children }) {
  return (
    <div className="relative min-h-screen text-slate-800 bg-transparent">
      {/* Global Grid Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
            bg-[size:24px_24px]
            [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
            opacity-20
          "
        />
      </div>
      {/* Top-layer subtle grid overlay to ensure pattern is visible over section backgrounds */}
      <div className="pointer-events-none fixed inset-0 z-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mix-blend-multiply opacity-10" />
      </div>

      {/* App Content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
