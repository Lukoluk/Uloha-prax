"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlaylist(formData: FormData, userId: number) {
  const playlistName = formData.get("playlistName");

  if (playlistName == null) {
    throw new Error("Playlist name missing");
  }

  const playlistNameStr = playlistName.toString();

  if (playlistNameStr === "") {
    throw new Error("Playlist name cannot be empty");
  }

  const db = getDb();

  const newPlaylist = await db
    .insertInto("playlists")
    .values({
      name: playlistNameStr,
      user_id: userId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  redirect(`/playlist/${newPlaylist.id}`);
}

export async function updatePlaylist(formData: FormData) {
  const playlistName = formData.get("playlistName");

  if (playlistName == null) {
    throw new Error("Playlist name missing");
  }

  const playlistNameStr = playlistName.toString();

  if (playlistNameStr === "") {
    throw new Error("Playlist name cannot be empty");
  }

  const playlistId = formData.get("playlistId");

  if (playlistId == null) {
    throw new Error("Playlist id missing");
  }

  const playlistIdInt = parseInt(playlistId.toString());

  if (isNaN(playlistIdInt)) {
    throw new Error("Invalid playlist id");
  }

  const db = getDb();

  await db.updateTable("playlists").set({ name: playlistNameStr }).where("id", "=", playlistIdInt).execute();

  revalidatePath(`/playlist/${playlistIdInt}`);
  redirect(`/playlist/${playlistIdInt}`);
}

export async function removeSongFromPlaylist(
  playlistId: number,
  songId: number
) {
  const db = getDb();
  //DELETE FROM table_name WHERE condition;
  console.log(`Removing song ${songId} from playlist ${playlistId}`);
  await db
  .deleteFrom ("playlists_songs")
  .where("playlist_id", "=", playlistId)
  .where("song_id", "=", songId)
  .execute();
  revalidatePath(`playlist/${playlistId}`);
}

export async function removePlaylist(
  playlistId: number,
) {
  const db = getDb();
  //DELETE FROM table_name WHERE condition;
  console.log(`Removing playlist ${playlistId}`);
  await db
  .deleteFrom ("playlists_songs")
  .where("playlist_id", "=", playlistId)
  .execute();
  await db
  .deleteFrom ("playlists")
  .where("id", "=", playlistId)
  .execute();
  redirect("/playlists");
}

export async function addSongToPlaylist(
  playlistId: number,
  songId: number
) {
  const db = getDb();
  console.log(`Adding song ${songId} to playlist ${playlistId}`);
  await db
    .insertInto("playlists_songs")
      .values({
        playlist_id: playlistId,
        song_id: songId
      })
      .execute();
}