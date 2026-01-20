"use client";

import { createPlaylist } from "@/actions/playlists";

export function CreatePlaylistPage() {
  return (
      <>
      <button className="btn" onClick={()=>document.getElementById('my_modal_5')?.showModal()}>Create playlist</button>
          <dialog id="my_modal_5" className="modal">
            <div className="modal-box">
              <p className="text-2xl font-bold">Create Playlist</p>
              <form action={createPlaylist}>
                <input className="input" type="text" name="playlistName" />
                <input className="btn" type="submit" value="Create" />
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
      </>
  );
}