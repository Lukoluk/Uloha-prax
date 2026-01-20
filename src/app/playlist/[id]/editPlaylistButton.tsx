"use client";

import { updatePlaylist } from "@/actions/playlists";

export function EditPlaylistButton(props: {
  playlist: {
    name: string;
    id: number;
    user_id: number;}
}) {
  return (
    <>
    <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Edit</button>
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <p className="text-2xl font-bold">Update Playlist: {props.playlist.name}</p>
        <form action={updatePlaylist}>
          <input
            type="text"
            name="playlistId"
            value={props.playlist.id}
            hidden
            readOnly
          />
          <input
            className="input"
            type="text"
            name="playlistName"
            defaultValue={props.playlist.name}
          />
          <input className="btn" type="submit" value="Update" />
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

