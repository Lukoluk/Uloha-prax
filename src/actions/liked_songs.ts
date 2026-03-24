"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function removeSongFromLiked(
  userId: number,
  songId: number
) {
  const db = getDb();
  //DELETE FROM table_name WHERE condition;
  console.log(`Removing song ${songId} from liked songs ${userId}`);
  await db
  .deleteFrom ("user_liked_songs")
  .where("user_id", "=", userId)
  .where("song_id", "=", songId)
  .execute();
  revalidatePath(`/liked_songs`);
}


export async function addSongToLiked(
  userId: number,
  songId: number
) {
  const db = getDb();
  console.log(`Adding song ${songId} to liked songs ${userId}`);
  await db
    .insertInto("user_liked_songs")
      .values({
        user_id: userId,
        song_id: songId
      })
      .execute();
}