import { SidebarInset, SidebarProvider } from "~shared/ui/sidebar";
import { LeftSidebar } from "~widgets/sidebar/sidebar.ui";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LeftSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
