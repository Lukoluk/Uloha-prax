import { getDb } from "@/lib/db";
import Link from 'next/link';
import { RemoveLikedSongButton } from "./RemoveLikedSongButton";

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}   

export default async function LikedSongs() {
  const db = getDb();

  const songs = await db
    .selectFrom("user_liked_songs")
    .where("user_liked_songs.user_id", "=", 1)
    .innerJoin("songs", "user_liked_songs.song_id", "songs.id")
    .select([
      "songs.id",
      "songs.name as song_name",
      "songs.duration as song_duration",
    ])
    .execute();


  return (    
    <>
        <h1 className="text-4xl font-bold">Liked Songs</h1>
        <table className="table w-full">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Duration</th>
            </tr>
            {songs.map((song, index) => (
              <tr key={song.id}>
                <td>{index + 1}</td>
                <td>{song.song_name}</td>
                <td>{formatDuration(song.song_duration)}</td>
                <td>
                    <RemoveLikedSongButton
                      userId={1}
                      songId={song.id}
                    />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <Link className="btn btn-primary btn-block" href="/playlists">Go Back</Link>
        </div>
      </>
  )};