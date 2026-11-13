
import { useState } from "react";

export default function NoteDialog(props) {
  const [title, setTitle] = useState(props.title);
  const [note, setNote] = useState(props.note);

  function handleDone() {
    props.onSave({ title: title, note: note, });
    props.onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={props.onClose}
    >
      <div
        className="bg-white w-[500px] max-h-[80vh] p-6 rounded-lg shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold outline-none"
          placeholder="Title"
        />

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-1 min-h-[200px] overflow-y-auto mt-4 outline-none resize-none"
          placeholder="Write your note..."
        />

        <p className="text-sm text-gray-400 mt-2">
          {props.createdAt.toLocaleDateString()}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={props.onClose}
            className="text-red-500"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleDone}
            className="text-black"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
