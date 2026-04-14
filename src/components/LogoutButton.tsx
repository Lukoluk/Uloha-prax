"use client";

import { logout } from "@/actions/auth";

export function LogoutButton({
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Logging out");
        logout();
      }}
    >
      Logout
    </button>
  );
}
