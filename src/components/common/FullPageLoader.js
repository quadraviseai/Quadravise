export default function FullPageLoader({ label = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/20 border-t-black" />

        {/* Text */}
        <p className="text-sm text-black/60">{label}</p>
      </div>
    </div>
  );
}
