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

interface DeleteDirectoryModalProps {
  trigger: React.ReactElement;
}

export function DeleteDirectoryModal({ trigger }: DeleteDirectoryModalProps) {
  // TODO: 디렉토리 삭제 처리
  const handleDelete = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>디렉토리 삭제</DialogTitle>
          <DialogDescription>
            디렉토리를 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
