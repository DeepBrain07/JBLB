import { useState } from "react";

interface ReferralData {
  username?: string;
  waitlist_id?: string;
  position?: number;
  created_at?: string;
  status?: string;
}

interface WaitlistTableProps {
  data?: ReferralData[];
}

const PAGE_SIZE = 10;

const WaitlistTable = ({ data = [] }: WaitlistTableProps) => {
  const [page, setPage] = useState(1);
  
  // Calculate total pages based on passed data
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  
  // Slice data for pagination
  const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full mx-auto text-bodyTextDim">
      {/* Scrollable wrapper */}
      <div className="overflow-x-auto border border-borderColor bg-bgColor">
        <table className="w-full border-collapse text-center min-w-[700px]">
          <thead className="text-xs uppercase text-bodyTextDim bg-[#020409]">
            <tr>
              <th className="p-4 border-r border-borderColor sticky left-0 bg-[#020409] z-10 text-primary">
                Profile
              </th>
              <th className="p-4 border-r border-borderColor">Waitlist ID</th>
              <th className="p-4 border-r border-borderColor">Position</th>
              <th className="p-4 border-r border-borderColor">Joined</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-borderColor hover:bg-[#121212] transition font-mono text-sm"
                >
                  <td className="p-4 border-r border-borderColor sticky left-0 bg-bgColor z-10 text-white font-bold">
                    @{row.username || "anonymous"}
                  </td>
                  <td className="p-4 border-r border-borderColor opacity-70">
                    {row.waitlist_id || "N/A"}
                  </td>
                  <td className="p-4 border-r border-borderColor text-primary">
                    #{row.position || "0"}
                  </td>
                  <td className="p-4 border-r border-borderColor text-xs">
                    {row.created_at ? new Date(row.created_at).toLocaleDateString() : "Pending"}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`size-2 rounded-full animate-pulse ${
                          row.status?.toLowerCase() === "active" || row.status?.toLowerCase() === "verified"
                            ? "bg-primary"
                            : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-white text-[10px] uppercase tracking-tighter">
                        {row.status || "Active"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center opacity-50 italic">
                  No recruits found in your network yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Only show if there's more than one page) */}
      {totalPages > 1 && (
        <div className="flex items-center border-1 border-t-0 border-borderColor p-2 justify-between text-[10px] font-bold tracking-widest">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border border-borderColor disabled:opacity-20 hover:text-primary transition-colors"
          >
            PREVIOUS
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`size-8 border border-borderColor transition-all ${
                  page === i + 1 ? "bg-primary text-black" : "hover:bg-[#1A1A1A]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border border-borderColor disabled:opacity-20 hover:text-primary transition-colors"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default WaitlistTable;