import { z } from 'zod';
import { folderDetailSchema, linkDetailSchema } from './pages';

// FolderDetailsResponseContent 스키마
const folderDetailsResponseContentSchema = z.object({
  folderDetailResponses: z.array(folderDetailSchema),
  linkDetailResponses: z.array(linkDetailSchema),
  targetFolderId: z.string(),
  targetFolderName: z.string(),
  targetFolderDepth: z.number(),
  folderCount: z.number(),
  linkCount: z.number(),
});

// FolderDetailsResponse 스키마 (ApiResponseStructure)
export const folderDetailsResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: folderDetailsResponseContentSchema,
});

// 타입 추론
export type FolderDetailsResponseSchema = z.infer<
  typeof folderDetailsResponseSchema
>;
export type FolderDetailsResponseContentSchema = z.infer<
  typeof folderDetailsResponseContentSchema
>;
