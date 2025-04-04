import { CreatePageModal } from "~features/page/create-page/create-page.ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~shared/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~shared/ui/sidebar";
import { Plus, Star, UserRound, UsersRound } from "lucide-react";
// import Link from "next/link";

export function LeftSidebar() {
  // TODO: 사용자 프로필(SidebarHeader), 공유페이지 목록(SidebarMenuSub)

  return (
    <Sidebar side="left" variant="inset" collapsible="offcanvas">
      <SidebarHeader>사용자 프로필</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <MenuItem href="/favorites" icon={<Star />} label="즐겨찾기" />
          <MenuItem href="/personal" icon={<UserRound />} label="개인 페이지" />
          <SharedPagesMenuItem />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function MenuItem({ href, icon, label }: MenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        {/* <Link href={href}>
          {icon}
          <span>{label}</span>
        </Link> */}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SharedPagesMenuItem() {
  // dummy data
  const sharedPages = [
    { pageId: 0, pageTitle: "공유페이지0" },
    { pageId: 1, pageTitle: "공유페이지1" },
    { pageId: 2, pageTitle: "공유페이지2" },
  ];

  return (
    <Collapsible>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <UsersRound />
            <span>공유 페이지</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CreatePageModal
          trigger={
            <SidebarMenuAction>
              <Plus />
            </SidebarMenuAction>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub>
            {sharedPages.map((page) => (
              <SharedPageItem
                key={page.pageId}
                pageId={page.pageId}
                pageTitle={page.pageTitle}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

interface SharedPageItemProps {
  pageId: number;
  pageTitle: string;
}

function SharedPageItem({ pageId, pageTitle }: SharedPageItemProps) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        {/* <Link href={`/shared/${pageId}`}>{pageTitle}</Link> */}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
