'use server'
 
import { getDb } from "@/lib/db";
import { cookies } from 'next/headers'
 
export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const db = getDb();

  const user = await db
    .selectFrom("users")
    .where("users.email", "=", email)
    .selectAll()
    .execute();
  
  if (user.length === 0) {
    console.log(`User with email ${email} not found`);
    return;
  }

  if (user[0].password !== password) {
    console.log(`Incorrect password for user ${email}`);
    return;
  }

  

  const cookieStore = await cookies()
 
  cookieStore.set('id', user[0].id.toString(), { secure: true })
  console.log(`User ${email} logged in successfully with id ${user[0].id}`);

}