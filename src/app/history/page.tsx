import { getDb } from "@/lib/db";
import Link from 'next/link';
import { cookies } from 'next/headers';

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}   

export default async function History() {
  const db = getDb();

  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value

  if (!userId) {
    console.log('No userId cookie found')
    return
  }

  console.log("User ID from cookie:", userId);

  const songs = await db
    .selectFrom("playback_events")
    .where("playback_events.user_id", "=", Number(userId))
    .innerJoin("songs", "playback_events.song_id", "songs.id")
    .select([
      "playback_events.event_date",
      "playback_events.event_name",
      "playback_events.id",
      "songs.name as song_name",
      "songs.duration as song_duration",
    ])
    .execute();


  return (    
    <>
        <h1 className="text-4xl font-bold">History</h1>
        <table className="table w-full">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Song Name</th>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Song Duration</th>
            </tr>
            {songs.map((song, index) => (
              <tr key={song.id}>
                <td>{index + 1}</td>
                <td>{song.song_name}</td>
                <td>{song.event_name}</td>
                <td>{new Date(song.event_date).toDateString()}</td>
                <td>{formatDuration(song.song_duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <Link className="btn btn-primary btn-block" href="/playlists">Go Back</Link>
        </div>
      </>
  )};