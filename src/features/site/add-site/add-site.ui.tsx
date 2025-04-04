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

interface AddSiteModalProps {
  trigger: React.ReactElement;
}

const formSchema = z.object({
  name: z.string().refine((value) => value.trim().length > 0, {
    message: "사이트 이름을 입력해주세요",
  }),
  url: z.string().url("유효한 URL을 입력해주세요"),
});

export function AddSiteModal({ trigger }: AddSiteModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
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
          <DialogTitle>사이트 추가</DialogTitle>
          <DialogDescription>새 사이트를 추가합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="add-site-form" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField control={form.control} name="name" label="이름" />
            <InputField
              control={form.control}
              name="url"
              label="URL"
              type="url"
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="add-site-form">
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface InputFieldProps {
  control: Control<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  label: string;
  type?: string;
}

function InputField({ control, name, label, type = "text" }: InputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
