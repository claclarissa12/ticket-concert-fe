
export default function TicketHeader() {
  return (
    <>
      <header className="bg-[#121212] border-b border-[#333] px-6 py-4">
        <h1 className="text-xl font-semibold">
          Ticket<span className="text-[#FBADCC]">.COM</span>
        </h1>
      </header>

      <div className="bg-[#121212] border-b border-[#333] px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-lg bg-[#FBADCC] flex items-center justify-center text-2xl font-bold text-black shrink-0">
            T
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg font-bold">Tom Jones (21+)</h2>
              <span className="text-xs px-3 py-1 rounded-full border border-[#333]">
                ⓘ More Info
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Sun • Oct 04, 2026 • 7:00 PM
            </p>
            <p className="text-sm text-gray-400">
              The Hall at Live!, Hanover, MD
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
