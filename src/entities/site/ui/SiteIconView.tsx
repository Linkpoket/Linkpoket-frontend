import { Square } from "lucide-react";
import { Link } from "react-router-dom";

export function SiteIconView() {
  return (
    <Link to="" className="block w-32">
      <Square size={128} fill="lightgray" stroke="none" className="mx-auto" />
      <p className="text-sm text-center -mt-2">사이트 이름</p>
    </Link>
  );
}
