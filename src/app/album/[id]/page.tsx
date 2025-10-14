import { getDb } from "@/lib/db";
import Link from 'next/link'

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default async function AlbumDetails({ params }: { params: { id: string } }) {
  const db = getDb();
  const { id } = params;
  console.log("Album ID:", id);

  const songs = await db
    .selectFrom("songs")
    .where("songs.album_id", "=", Number(id))
    .selectAll()
    .execute();

  const album = await db
    .selectFrom("albums")
    .where("albums.id", "=", Number(id))
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "authors.name as author_name",
    ])
    .execute();


  return (    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">{album[0].name} - {album[0].author_name}</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          This is the Album Details page for album {album[0].name}. Here you can add some
          description about the album, its tracks, release date, and anything else
          youd like visitors to know. Keep it simple, clean, and informative.
        </p>
        <table className="table w-full">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Duration</th>
          </tr>
          {songs.map((song, index) => (
            <tr key={song.id}>
              <td>{index + 1}</td>
              <td>{song.name}</td>
              <td>{formatDuration(song.duration)}</td>
            </tr>
          ))}
        </table>
        <div className="mt-6">
          <Link className="btn btn-primary btn-block" href="/">Go Home</Link>
        </div>
      </main>
    </div>
  )};