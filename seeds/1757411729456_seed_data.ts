import { DB } from "@/lib/db-types";
import { faker } from "@faker-js/faker";
import type { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("playlists").execute();
  await db.deleteFrom("playlists_songs").execute();

  const songs = await db.selectFrom("songs").select(["id"]).execute();
  const songIds = songs.map((s) => s.id);


  if (songIds.length === 0) {
    console.warn("No songs found in the database — skipping playlist seeding.");
  } else {
    for (let i = 0; i < 20; i++) {
      const playlist = await db
        .insertInto("playlists")
        .values({ name: faker.music.genre() + " Mix" })
        .returning(["id"])
        .executeTakeFirstOrThrow();

      const selectedSongIds = faker.helpers.arrayElements(songIds, faker.number.int({ min: 5, max: 15 }));

      for (const songId of selectedSongIds) {
        await db
          .insertInto("playlists_songs")
          .values({
            playlist_id: playlist.id,
            song_id: songId,
          })
          .execute();
      }
    }
  }
}