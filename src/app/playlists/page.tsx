import { getDb } from "@/lib/db";
import Link from 'next/link';
import { RemovePlaylistButton } from "../playlist/[id]/RemovePlaylistButton";
import { CreatePlaylistPage } from "./NewPlaylistButton";
import { cookies } from 'next/headers';

export default async function Playlists() {
  const db = getDb();

  const cookieStore = await cookies()
  const id = cookieStore.get('id')

  const playlists = await db
    .selectFrom("playlists")
    .select([
      "playlists.id",
      "playlists.name",
    ])
    .where("playlists.user_id", "=", Number(id))
    .execute();

  return (
    <>
        <p className="text-2xl font-bold">Playlists</p>
          <CreatePlaylistPage/>
        <div className="grid grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <span className="badge badge-xs badge-warning">Playlist</span>
                <h2 className="text-3xl font-bold"><Link
                  href={`/playlist/${playlist.id}`}>
                  {playlist.name}
                </Link></h2>
                <RemovePlaylistButton
                  playlistId={playlist.id}
                />
              </div>
            </div>
          ))}
        </div>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </>
  );
}
