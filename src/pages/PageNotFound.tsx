import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="my-container flex flex-col">
    
      <h1 className="font-bold text-3xl">404 Page not found</h1>
      <Link to="/" className="bg-blue-500 rounded p-3 w-max mt-8">Go to Homepage</Link>

    </div>
  )
}