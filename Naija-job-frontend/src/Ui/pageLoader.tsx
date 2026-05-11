export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-slate-800" />
      <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-amber-500 animate-spin" />
    </div>
  </div>
);