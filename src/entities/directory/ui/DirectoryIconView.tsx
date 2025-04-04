import { Folder } from "lucide-react";
import { Link } from "react-router-dom";

export function DirectoryIconView() {
  return (
    <Link to="" className="block w-32">
      <Folder size={128} fill="lightblue" stroke="none" className="mx-auto" />
      <p className="text-sm text-center -mt-2">디렉토리 이름</p>
    </Link>
  );
}
