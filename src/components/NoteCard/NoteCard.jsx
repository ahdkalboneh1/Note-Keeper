import { useState } from "react";
import NoteDialog from "../NoteDialog/NoteDialog";
import { Trash2 } from "lucide-react";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

export default function NoteCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative w-[300px] min-h-[120px] h-fit ${props.color} border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col overflow-hidden cursor-pointer hover:shadow-md transition-colors`}>
        <h2 className="font-semibold text-lg break-words line-clamp-2">
          {props.title}
        </h2>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteOpen(true);
          }}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>

        {isDeleteOpen && (
          <DeleteDialog
            onCancel={() => setIsDeleteOpen(false)}
            onConfirm={() => {
              props.onDeleteNote(props.index);
              setIsDeleteOpen(false);
              setIsOpen(false);
            }}
          />
        )}

        <div className="mt-2">
          <p className="text-gray-700 break-words whitespace-pre-wrap">
            {props.note}
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-2 shrink-0">
          {props.createdAt.toLocaleDateString()}
        </p>
      </div>

      {isOpen && (
        <NoteDialog
          title={props.title}
          note={props.note}
          createdAt={props.createdAt}
          onClose={() => setIsOpen(false)}
          onSave={(updatedNote) =>
            props.onUpdateNote(props.index, updatedNote)
          }
        />
      )}
    </>
  );
}
