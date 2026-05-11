import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

interface ErrorPageProps {
  status?: number;
  title?: string;
  message?: string;
}

const ErrorPage = ({
  status,
  title,
  message,
}: ErrorPageProps) => {
  const routeError = useRouteError();

  const resolvedStatus =
    status ?? (isRouteErrorResponse(routeError) ? routeError.status : 500);
  const resolvedTitle =
    title ??
    (resolvedStatus === 404
      ? "Page not found"
      : "Something went wrong");
  const resolvedMessage =
    message ??
    (isRouteErrorResponse(routeError)
      ? routeError.statusText
      : routeError instanceof Error
      ? routeError.message
      : "The app hit an unexpected problem. You can go back or return home.");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
          <AlertTriangle size={30} />
        </div>

        <p className="text-amber-400 text-sm font-black tracking-[0.25em] uppercase mb-3">
          {resolvedStatus}
        </p>
        <h1 className="text-3xl font-black text-white mb-3">{resolvedTitle}</h1>
        <p className="text-slate-400 leading-relaxed mb-8">{resolvedMessage}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 px-5 py-3 text-slate-200 font-bold hover:border-amber-500/40 hover:text-amber-400 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-black font-black hover:bg-amber-400 transition"
          >
            <Home size={18} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
