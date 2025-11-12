import { useEffect, useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    localStorage?.setItem("searchTerm",trimmed)
    onSearch(trimmed);
  };


  useEffect(()=>{
 const searchTerm = localStorage?.getItem("searchTerm")
 if(searchTerm){
  setUsername(searchTerm)
  onSearch(searchTerm)
 }

  }, [])
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center w-full max-w-2xl mx-auto relative group"
    >
      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        placeholder="🔍 Search GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-all duration-300"
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}
