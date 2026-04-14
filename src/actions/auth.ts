'use server'
 
import { getDb } from "@/lib/db";
import { cookies } from 'next/headers'
 
export async function login(formData: FormData) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId.value')

  if (!userId) {
    cookieStore.delete('userId')
  }
  
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

 
  cookieStore.set('userId', user[0].id.toString())
  console.log(`User ${email} logged in successfully with id ${user[0].id}`);
  console.log('Set-Cookie header:', cookieStore.get('userId'));

}

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (password !== confirmPassword) {
    console.log('Passwords do not match');
    return;
  }

  const db = getDb();

  const existingUser = await db
    .selectFrom('users')
    .selectAll()
    .where('users.email', '=', email)
    .execute();

  if (existingUser.length > 0) {
    console.log(`User with email ${email} already exists`);
    return;
  }

  await db
    .insertInto('users')
    .values({
      name: name,
      email: email,
      password: password,
    })
    .execute();

  console.log(`User ${email} registered successfully`);
}

export async function logout() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId.value')

  if (!userId) {
    cookieStore.delete('userId')
  }
}