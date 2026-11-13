import { Search } from "lucide-react";

export default function SearchField(props) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          className="w-[600px] h-[40px] pl-10 bg-gray-100 rounded-md"
          type="search"
          value={props.searchTerm}
          onChange={(e) => props.onSearchChange(e.target.value)}
          placeholder="Search notes..."
        />
      </div>
    </form>
  );
}