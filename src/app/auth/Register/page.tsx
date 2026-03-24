import { getDb } from "@/lib/db";
import Link from 'next/link'

export default async function RegisterPage() {
  const db = getDb();

  return (    
    <>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mb-5">

        <label className="label">Name</label>
        <input type="text" className="input" placeholder="Name" />

        <label className="label">Surname</label>
        <input type="text" className="input" placeholder="Surname" />

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Phone number</label>
        <input type="tel" className="input" placeholder="+421 123 456 789" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <label className="label">Confirm password</label>
        <input type="password" className="input" placeholder="Confirm password" />

        <button className="btn btn-neutral mt-4">Register</button>
      </fieldset>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </>
  )};