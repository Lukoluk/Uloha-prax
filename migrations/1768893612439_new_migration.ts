import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`CREATE TABLE user_liked_songs (
		id integer primary key autoincrement not null,
		user_id integer NOT NULL,
		song_id integer NOT NULL,
		foreign key (user_id) references users (id),
		foreign key (song_id) references songs (id)
	) STRICT`.execute(db);
}
