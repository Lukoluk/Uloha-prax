import { getDb } from "@/lib/db";
import Link from 'next/link';
import { RemovePlaylistSongButton } from "./RemovePlaylistSongButton";
import { RemovePlaylistButton } from "./RemovePlaylistButton";
import { EditPlaylistButton } from "./editPlaylistButton";
import { AddLikedSongButton } from "../../../components/AddLikedSongButton";

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}   

export default async function PlaylistDetails({ params }: { params: { id: string } }) {
  const db = getDb();
  const { id } = await params;
  console.log("PLAYLIST ID:", id);

  const playlist = await db
    .selectFrom("playlists")
    .where("playlists.id", "=", Number(id))
    .selectAll()
    .execute();

  const songs = await db
    .selectFrom("playlists_songs")
    .where("playlists_songs.playlist_id", "=", Number(id))
    .innerJoin("songs", "playlists_songs.song_id", "songs.id")
    .select([
      "songs.id",
      "songs.name as song_name",
      "songs.duration as song_duration",
    ])
    .execute();


  return (  
    <>
        <h1 className="text-4xl font-bold">{playlist[0].name}</h1>
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
                  <AddLikedSongButton
                    userId={1}
                    songId={song.id}
                  />
                </td>
                <td>
                    <RemovePlaylistSongButton
                      playlistId={playlist[0].id}
                      songId={song.id}
                    />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditPlaylistButton
          playlist={playlist[0]}
        />
        <RemovePlaylistButton
          playlistId={playlist[0].id}
        />
        <div className="mt-6">
          <Link className="btn btn-primary btn-block" href="/playlists">Go Back</Link>
        </div>
      </>
  )};