interface PageLoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export const PageLoader = ({
  label = "Loading NaijaJobs",
  fullScreen = true,
}: PageLoaderProps) => (
  <div
    className={`flex items-center justify-center bg-slate-950 ${
      fullScreen ? "min-h-screen" : "min-h-[50vh]"
    }`}
  >
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-amber-400 to-yellow-600 shadow-2xl shadow-amber-500/20" />
        <div className="absolute inset-0 rounded-3xl border border-amber-200/40 animate-ping" />
        <div className="absolute inset-1 rounded-[1.25rem] bg-slate-950 flex items-center justify-center">
          <span className="text-2xl font-black text-amber-400 tracking-tight">NJ</span>
        </div>
      </div>
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold text-slate-300">{label}</p>
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:120ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  </div>
);
