export default function DeleteDialog(props) {
    return (
        <div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-[50]"
            onClick={(e) => {
                e.stopPropagation();
                props.onCancel();
            }}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[350px]"
                onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold">
                    Note Deletion
                </h2>

                <p className="text-black mt-2">
                    Are you sure you want to delete this note?
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={props.onCancel}
                        className="text-black"> Cancel </button>

                    <button
                        onClick={props.onConfirm}
                        className="text-red-600"> Delete </button>
                </div>
            </div>
        </div>
    );
}
