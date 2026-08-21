import { ServerCrash, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ServerUnavailable() {
const navigate = useNavigate();

const handleRetry = () => {
window.location.reload();
};

return ( <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6"> <div className="w-full max-w-lg text-center">
{/* Icon */} <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100"> <ServerCrash className="h-12 w-12 text-amber-600" /> </div>

    {/* Error Code */}
    <p className="text-7xl font-bold tracking-tight text-slate-900">
      503
    </p>

    {/* Heading */}
    <h1 className="mt-4 text-2xl font-semibold text-slate-900">
      Server Unavailable
    </h1>

    {/* Description */}
    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
      We are unable to connect to the server right now. The service may be
      temporarily unavailable or undergoing maintenance.
    </p>

    {/* Actions */}
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </button>

      <button
        type="button"
        onClick={handleRetry}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  </div>
</div>


);
}

export default ServerUnavailable;
