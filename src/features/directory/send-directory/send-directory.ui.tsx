"use client";

import { Button } from "~shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~shared/ui/form";
import { Input } from "~shared/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface SendDirectoryModalProps {
  trigger: React.ReactElement;
}

const formSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
});

export function SendDirectoryModal({ trigger }: SendDirectoryModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>디렉토리 전송</DialogTitle>
          <DialogDescription>
            [디렉토리명] 디렉토리를 다른 사용자에게 전송합니다.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="send-directory-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="send-directory-form">
            전송
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
