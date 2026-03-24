import { getDb } from "@/lib/db";
import Link from 'next/link';
import { login } from "@/actions/auth";

export default async function LoginPage() {
  const db = getDb();

  return (    
    <>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form action={login} method="POST">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mb-5">
      
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </>
  )};