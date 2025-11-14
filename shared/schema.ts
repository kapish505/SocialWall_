import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  message: z.string(),
  address: z.string(),
  timestamp: z.number(),
  likes: z.number(),
  dislikes: z.number(),
  likedBy: z.array(z.string()),
  dislikedBy: z.array(z.string()),
  signature: z.string().optional(),
  ensName: z.string().optional(),
});

export const insertPostSchema = z.object({
  message: z.string().min(1).max(500),
  address: z.string(),
  signature: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;

export const walletConnectionSchema = z.object({
  address: z.string(),
  ensName: z.string().optional(),
  chainId: z.number().optional(),
});

export type WalletConnection = z.infer<typeof walletConnectionSchema>;
