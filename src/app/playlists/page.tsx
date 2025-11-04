import { getDb } from "@/lib/db";
import Link from 'next/link'

export default async function Playlists() {
  const db = getDb();

  const playlists = await db
    .selectFrom("playlists")
    .select([
      "playlists.id",
      "playlists.name",
    ])
    .where("playlists.user_id", "=", 1)
    .execute();

  return (
    <>
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <span className="badge badge-xs badge-warning">Playlist</span>
                <h2 className="text-3xl font-bold"><Link
                  href={`/playlist/${playlist.id}`}>
                  {playlist.name}
                </Link></h2>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div></>
  );
}
