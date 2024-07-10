import Link from "@/components/ui/Link";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  let error = useRouteError();
  return (
    <div className="w-screen min-h-screen overflow-x-hidden flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Oops</h1>
      <p className="text-base text-gray-500">Something wrong has happens.</p>
      <div className="bg-red-50 border border-red-500 rounded-lg p-4 max-w-lg">
        {JSON.stringify(error, null, 4)}
      </div>
      <Link to="/">Back to home page</Link>
    </div>
  );
}
