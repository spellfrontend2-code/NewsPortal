import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  let title = "Something went wrong";
  let message = "The requested page could not be loaded.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Page Not Found";
      message = "The page you are looking for does not exist or the route is not registered.";
    } else if (error.status === 500) {
      title = "500 - Server Error";
      message = "We encountered an internal server error. Please try again later.";
    } else {
      title = `${error.status} ${error.statusText || ""}`;
      message = typeof error.data === "string" ? error.data : message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-bold text-xl">
          !
        </div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="submit" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;