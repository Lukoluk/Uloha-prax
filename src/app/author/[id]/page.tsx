import { getDb } from "@/lib/db";
import Link from 'next/link'

export default async function AuhorDetails({ params }: { params: { id: string } }) {
  const db = getDb();
  const { id } = await params;
  console.log("Author ID:", id);

  const albums = await db
    .selectFrom("albums")
    .where("albums.author_id", "=", Number(id))
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "authors.name as author_name",
    ])
    .execute();

  const author = await db
    .selectFrom("authors")
    .where("authors.id", "=", Number(id))
    .selectAll()
    .execute();

  console.log("Fetched author:", author);

  return (    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">{author[0].name}</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          {author[0].bio}
        </p>
        <table className="table w-full">
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
        </table>
        <div className="mt-6">
          <Link className="btn btn-primary btn-block" href="/">Go home</Link>
        </div>
      </main>
    </div>
  )};