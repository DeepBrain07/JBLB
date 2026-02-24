import { useState } from "react";
import { rank1, rank2, rank3 } from "../../../assets/images";

interface LeaderboardEntry {
  username?: string;
  total_referrals?: number;
  position?: number;
  earnings?: string | number;
}

interface LeaderboardProps {
  data?: LeaderboardEntry[];
}

const PAGE_SIZE = 5;

const Leaderboard = ({ data = [] }: LeaderboardProps) => {
  const [page, setPage] = useState(1);
  
  // Use backend data or fall back to an empty array
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  console.log(paginatedData)

  return (
    <div className="w-full mx-auto text-bodyTextDim">
      {/* Scrollable wrapper */}
      <div className="overflow-x-auto border border-borderColor bg-bgColor">
        <table className="w-full border-collapse text-center min-w-[600px]">
          <thead className="text-xs uppercase text-bodyTextDim bg-[#020409]">
            <tr>
              <th className="p-4 border-r border-borderColor">RANK</th>
              <th className="p-4 border-r border-borderColor sticky left-0 bg-[#020409] z-10">
                MEMBER
              </th>
              <th className="p-4 border-r border-borderColor">REFERRALS</th>
              <th className="p-4 border-r border-borderColor">POSITION</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => {
                // Calculate actual rank based on page and index
                const actualRank = (page - 1) * PAGE_SIZE + (index + 1);

                return (
                  <tr
                    key={index}
                    className="border-t border-borderColor hover:bg-[#121212] transition"
                  >
                    <td className="p-4 border-r flex justify-center items-center border-borderColor">
                      {actualRank === 1 ? (
                        <img src={rank1} alt="rank1" className="w-8" />
                      ) : actualRank === 2 ? (
                        <img src={rank2} alt="rank2" className="w-8" />
                      ) : actualRank === 3 ? (
                        <img src={rank3} alt="rank3" className="w-8" />
                      ) : (
                        <span className="font-mono opacity-60">{actualRank}</span>
                      )}
                    </td>

                    <td className="p-4 cursor-pointer hover:underline border-r border-borderColor sticky left-0 bg-bgColor z-10 text-white font-bold">
                      @{row.username || "anonymous_node"}
                    </td>

                    <td className="p-4 border-r border-borderColor font-mono">
                      {row.total_referrals ?? 0}
                    </td>

                    <td className="p-4 font-mono text-primary">
                      #{row.position || "---"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center opacity-50 italic">
                  Leaderboard data is currently being synthesized...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Only show if data exists and spans multiple pages */}
      {totalPages > 1 && (
        <div className="flex items-center border-1 border-t-0 border-borderColor p-2 justify-between text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border border-borderColor disabled:opacity-40 uppercase tracking-tighter hover:text-primary transition-colors"
          >
            PREVIOUS
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`size-8 border border-borderColor transition-all ${
                  page === i + 1 ? "bg-primary text-black font-bold" : "hover:bg-[#1A1A1A]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border border-borderColor disabled:opacity-40 uppercase tracking-tighter hover:text-primary transition-colors"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;