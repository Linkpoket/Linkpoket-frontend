import { Button } from '@/shared/ui/Button';

export default function TEST() {
  return (
    <div>
      <h1 className="mx-auto w-[300px]">테스트를 위한 임시 파일입니다.</h1>
      <div className="flex item-center justify-center gap-2 my-20">
        <Button variant="primary" size="lg" className="py-2">
          버튼
        </Button>

        <Button variant="secondary" size="lg" className="py-2">
          버튼
        </Button>

        <Button variant="ghost" size="lg" className="py-2">
          버튼
        </Button>
      </div>
    </div>
  );
}
