import { Link } from "react-router";

export const Logo = () => {
  return (
     <Link to="/" className="flex items-center gap-2.5 group">
                  <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow duration-300">
                    <span className="text-black font-black text-sm absolute">NJ</span>
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">
                    Naija<span className="text-amber-400">Jobs</span>
                  </span>
                </Link>
  );
};
