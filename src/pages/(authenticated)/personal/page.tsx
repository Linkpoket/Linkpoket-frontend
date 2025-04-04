import { DirectoryIconView } from "~entities/directory/ui/DirectoryIconView";
import { SiteIconView } from "~entities/site/ui/SiteIconView";
import { Button } from "~shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~shared/ui/select";
import { SidebarTrigger } from "~shared/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "~shared/ui/tabs";
import { Folder, Grid2X2, List, SquarePlus } from "lucide-react";

export default function PersonalPage() {
  return (
    <>
      <header className="h-11 px-2 flex items-center">
        <SidebarTrigger />
      </header>
      <div className="bg-neutral-100 p-10">
        <p className="text-4xl font-medium mb-4">개인 페이지 제목</p>
        <p className="text-base max-w-[768px]">
          개인 페이지 설명 개인 페이지 설명 개인 페이지 설명 개인 페이지 설명
          개인 페이지 설명 개인 페이지 설명
        </p>
      </div>
      <div className="w-full max-w-[1260px] mx-auto px-12 mt-6 flex flex-row gap-3">
        <Button size="sm">
          <SquarePlus />
          사이트 추가
        </Button>
        <Button size="sm" variant="secondary">
          <Folder />새 디렉토리
        </Button>
        <Select>
          <SelectTrigger className="w-28 h-9 ml-auto">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">최신순</SelectItem>
            <SelectItem value="a">ㄱㄴㄷ순</SelectItem>
          </SelectContent>
        </Select>
        <Tabs>
          <TabsList className="h-9">
            <TabsTrigger value="icon">
              <Grid2X2 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="w-full max-w-[1260px] mx-auto p-8 grid grid-cols-8 justify-items-center gap-y-6">
        <DirectoryIconView />
        <SiteIconView />
        <DirectoryIconView />
        <SiteIconView />
        <DirectoryIconView />
        <DirectoryIconView />
        <SiteIconView />
        <DirectoryIconView />
        <SiteIconView />
        <SiteIconView />
      </div>
    </>
  );
}
