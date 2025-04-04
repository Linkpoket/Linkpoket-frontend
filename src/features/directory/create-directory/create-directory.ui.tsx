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
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~shared/ui/textarea";

interface CreateDirectoryModalProps {
  trigger: React.ReactElement;
}

const formSchema = z.object({
  name: z.string().refine((value) => value.trim().length > 0, {
    message: "디렉토리 이름을 입력해주세요",
  }),
  description: z.string().optional(),
});

export function CreateDirectoryModal({ trigger }: CreateDirectoryModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>디렉토리 생성</DialogTitle>
          <DialogDescription>새 디렉토리를 생성합니다</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="create-directory-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <NameField control={form.control} />
            <DescriptionField control={form.control} />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-directory-form">
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FieldProps {
  control: Control<z.infer<typeof formSchema>>;
}

function NameField({ control }: FieldProps) {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이름</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DescriptionField({ control }: FieldProps) {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>설명</FormLabel>
          <FormControl>
            <Textarea className="resize-none" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
