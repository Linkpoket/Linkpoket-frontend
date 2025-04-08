import SideBar from '@/widgets/side-bar/SideBar';

const sharedPagesData = [
  { id: '1', title: '공유 페이지 1' },
  { id: '2', title: '공유 페이지 2' },
];

export default function TEST() {
  return (
    <div>
      <SideBar
        avatarUrl="/avatar.png"
        nickname="김링크"
        email="linkmoa@gmail.com"
        sharedPages={sharedPagesData}
        showFooter={true}
      />
    </div>
  );
}
