import { z } from "zod";

export enum NoteType {
  "TODO" = "TODO",
  "NOTE" = "NOTE",
  "REMINDER" = "REMINDER",
}

export const noteSchema = z.object({
  content: z.string().min(1),
  username: z.string().min(1),
  noteType: z.nativeEnum(NoteType),
});

export type NoteInput = z.infer<typeof noteSchema>;
