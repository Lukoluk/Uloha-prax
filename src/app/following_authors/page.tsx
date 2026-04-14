import { getDb } from "@/lib/db";
import Link from 'next/link';
import { cookies } from 'next/headers';
import { UnFollowArtistButton } from "./../../components/following_authors/UnfollowArtistButton";

export default async function Playlists() {
  const db = getDb();

  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value

  console.log(cookieStore.getAll())


  console.log("User ID from cookie:", userId);
  console.log("User ID in number from cookie:", Number(userId));

  const artists = await db
    .selectFrom("user_artists")
    .where("user_artists.user_id", "=", Number(userId))
    .innerJoin("authors", "user_artists.artist_id", "authors.id")
    .select([
      "user_artists.id",
      "user_artists.created_at",
      "user_artists.artist_id",
      "authors.name as author_name",
    ])
    .execute();

  return (
    <>
        <h1 className="text-4xl font-bold">Followd artists</h1>
        <table className="table w-full">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
            {artists.map((artist, index) => (
              <tr key={artist.id}>
                <td>{index + 1}</td>
                <td>{artist.author_name}</td>
                <td>
                    <UnFollowArtistButton
                      userId={Number(userId)}
                      artistId={artist.artist_id}
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
  );
}
