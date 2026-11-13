import { useState } from "react";

export default function NoteInput({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() && !note.trim()) return;
    onAddNote({ title, note });
    setTitle("");
    setNote("");
    setIsExpanded(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[600px] border border-gray-500 rounded-lg p-4 shadow-sm"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            if (!title.trim() && !note.trim()) {
              setIsExpanded(false);
            }
          }
        }}
      >

        {!isExpanded ? (
          <textarea
            className="w-full h-[40px] resize-none outline-none"
            placeholder="Take a note..."
            onFocus={() => setIsExpanded(true)}
          />
        ) : (
          <div className="flex flex-col gap-3">
            <input
              className="w-full outline-none text-lg font-medium"
              type="text"
              placeholder="Title"
              value={title}
              maxLength={50}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full h-[120px] resize-none outline-none"
              placeholder="Write your note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form.requestSubmit();
                }
              }}
            />

            <button
              className="self-end px-4 py-2 rounded-md hover:bg-red-100"
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setNote("");
              }}
            > Cancel </button>
          </div>
        )}
      </div>
    </form>
  );
}
