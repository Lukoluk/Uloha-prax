"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function unfollow(
  userId: number,
  artistId: number
) {
  const db = getDb();
  console.log(`Removing song ${artistId} from following artists ${userId}`);
  await db
  .deleteFrom ("user_artists")
  .where("user_id", "=", userId)
  .where("artist_id", "=", artistId)
  .execute();
  revalidatePath(`/following_authors`);
}

export async function follow(
  userId: number,
  artistId: number
) {
  const db = getDb();
  console.log(`Adding song ${artistId} to liked songs ${userId}`);
  await db
    .insertInto("user_artists")
      .values({
        user_id: userId,
        artist_id: artistId,
        created_at: Date.now()
      })
      .execute();
}