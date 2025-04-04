import { SidebarTrigger } from "~shared/ui/sidebar";

export default function SharedPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <SidebarTrigger />
      공유 페이지 {params.slug}
    </>
  );
}
