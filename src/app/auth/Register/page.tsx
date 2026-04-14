import { register } from "@/actions/auth";

export default async function RegisterPage() {

  return (    
    <>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form action={register}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mb-5">

          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" />

          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />

          <label className="label">Confirm password</label>
          <input type="password" name="confirmPassword" className="input" placeholder="Confirm password" />

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </>
  )};