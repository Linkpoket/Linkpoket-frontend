import { CreateDirectoryModal } from "~features/directory/create-directory/create-directory.ui";
import { DeleteDirectoryModal } from "~features/directory/delete-directory/delete-directory.ui";
import { SendDirectoryModal } from "~features/directory/send-directory/send-directory.ui";
import { DeletePageModal } from "~features/page/delete-page/delete-page.ui";
import { LeavePageModal } from "~features/page/leave-page/leave-page.ui";
import { AddSiteModal } from "~features/site/add-site/add-site.ui";
import { Button } from "~shared/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      랜딩페이지
      <div>
        <DeletePageModal trigger={<Button>공유 페이지 삭제</Button>} />
        <LeavePageModal trigger={<Button>공유 페이지 탈퇴</Button>} />
        <CreateDirectoryModal trigger={<Button>디렉토리 생성</Button>} />
        <DeleteDirectoryModal trigger={<Button>디렉토리 삭제</Button>} />
        <SendDirectoryModal trigger={<Button>디렉토리 전송</Button>} />
        <AddSiteModal trigger={<Button>사이트 추가</Button>} />
      </div>
    </main>
  );
}
