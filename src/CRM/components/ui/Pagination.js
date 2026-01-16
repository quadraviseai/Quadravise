export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  function go(page) {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 bg-neutral-50 text-sm">
      {/* Left info */}
      <div className="text-neutral-600">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => go(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border border-neutral-300 px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const active = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => go(page)}
              className={`rounded-md px-3 py-1 border ${
                active
                  ? "bg-black text-white border-black"
                  : "border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => go(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md border border-neutral-300 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
