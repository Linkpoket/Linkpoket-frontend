"use client";

import { Button } from "~shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~shared/ui/dialog";

interface LeavePageModalProps {
  trigger: React.ReactElement;
}

export function LeavePageModal({ trigger }: LeavePageModalProps) {
  // TODO: 공유 페이지 탈퇴 처리
  const handleLeave = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공유 페이지 탈퇴</DialogTitle>
          <DialogDescription>
            탈퇴하면 해당 페이지에 더 이상 접근할 수 없습니다. 정말
            탈퇴하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleLeave}>
            탈퇴
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
