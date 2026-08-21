import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-gray-600">
          The requested page could not be loaded.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;