import { ShieldX, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Unauthorized() {
const navigate = useNavigate();

return ( 
<div className="min-h-screen bg-slate-50 flex items-center justify-center px-6"> <div className="w-full max-w-lg text-center">
 <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100"> <ShieldX className="h-12 w-12 text-red-600" /> </div>

    {/* Error Code */}
    <p className="text-7xl font-bold tracking-tight text-slate-900">
      403
    </p>

    {/* Heading */}
    <h1 className="mt-4 text-2xl font-semibold text-slate-900">
      Access Denied
    </h1>

    {/* Description */}
    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
      You do not have permission to access this page. Please contact your
      administrator if you believe you should have access.
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

      <Link
        to="/admin"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>
    </div>
  </div>
</div>


);
}

export default Unauthorized;
