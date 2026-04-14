import { getDb } from "@/lib/db";
import Link from 'next/link';
import { FollowArtistButton } from "./../../../components/following_authors/FollowArtistButton";
import { cookies } from 'next/headers';

export default async function AuhorDetails({ params }: { params: { id: string } }) {
  const db = getDb();
  const { id } = await params;
  console.log("Author ID:", id);

  const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value
  
    console.log(cookieStore.getAll())
  
  
    console.log("User ID from cookie:", userId);
    console.log("User ID in number from cookie:", Number(userId));

  const albums = await db
    .selectFrom("albums")
    .where("albums.author_id", "=", Number(id))
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "authors.name as author_name",
      "authors.id as author_id",
    ])
    .execute();

  const author = await db
    .selectFrom("authors")
    .where("authors.id", "=", Number(id))
    .selectAll()
    .execute();

  console.log("Fetched author:", author);

  return (    
    <>
        <h1 className="text-4xl font-bold">{author[0].name}</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          {author[0].bio}
        </p>
        <table className="table w-full">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
            {albums.map((album, index) => (
              <tr key={album.id}>
                <td>{index + 1}</td>
                <td>
                  <Link
                      href={`/album/${album.id}`}
                  >
                      {album.name}
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <FollowArtistButton
            userId={Number(userId)}
            artistId={Number(id)}
          />
        <div className="mt-6">
          <Link className="btn btn-primary btn-block" href="/">Go home</Link>
        </div>
     </>
  )};