import { z } from 'zod';

// FolderDetail 스키마
export const folderDetailSchema = z.object({
  isFavorite: z.boolean(),
  orderIndex: z.number(),
  createdDate: z.string(),
  folderId: z.string(),
  folderName: z.string(),
});

// LinkDetail 스키마
export const linkDetailSchema = z.object({
  linkName: z.string(),
  linkUrl: z.string(),
  linkId: z.string(),
  description: z.string().nullable(),
  isFavorite: z.boolean(),
  faviconUrl: z.string(),
  representImageUrl: z.string(),
  providerName: z.string(),
  orderIndex: z.number(),
  createdDate: z.union([z.string(), z.number()]),
});

// PageDataContent 스키마
const pageDataContentSchema = z.object({
  pageId: z.string(),
  pageTitle: z.string(),
  rootFolderId: z.string(),
  pageImageUrl: z.string(),
  folderDetailResponses: z.array(folderDetailSchema),
  linkDetailResponses: z.array(linkDetailSchema),
  fullPath: z.string(),
  pageVisibility: z.enum(['PUBLIC', 'RESTRICTED']),
});

// PageData 스키마
export const pageDataSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: pageDataContentSchema,
});

// 타입 추론
export type PageDataSchema = z.infer<typeof pageDataSchema>;
export type PageDataContentSchema = z.infer<typeof pageDataContentSchema>;
export type FolderDetailSchema = z.infer<typeof folderDetailSchema>;
export type LinkDetailSchema = z.infer<typeof linkDetailSchema>;
