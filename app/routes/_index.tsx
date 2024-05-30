import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="text-center text-[44px] font-bold mt-44">Movie<span className="text-blue-500">Land.</span></div>
      <div className="text center text-[20px] text-gray-800 text-opacity-70">Here you can explore all kind of data about popular titles</div>
      <Link className="flex justify-center items-center text-[20px] text-white bg-blue-500 p-3 rounded-md transition-all hover:last:translate-x-4" to={"/explore"}>
        <span>Explore now</span> <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  );
};