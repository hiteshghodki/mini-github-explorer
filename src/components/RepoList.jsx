import { useState } from "react";
import { useUser } from "../context/UserContext";
import RepoItem from "./RepoItem";

export default function RepoList() {
  const { repos } = useUser();
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("stars-desc");

  const filtered = repos.filter((r) =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "stars-asc":
        return a.stargazers_count - b.stargazers_count;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return b.stargazers_count - a.stargazers_count;
    }
  });

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex gap-3 flex-wrap">
          <input
            placeholder="Filter repos by name..."
            className="p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-blue-500 outline-none transition"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-blue-500"
          >
            <option value="stars-desc">Stars: High → Low</option>
            <option value="stars-asc">Stars: Low → High</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </div>
        <span className="text-gray-400 text-sm">
          Showing {sorted.length} repos
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="p-4 bg-gray-700/40 rounded-md text-center text-gray-300">
          No repositories match your filter.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {sorted.map((r) => (
            <RepoItem key={r.id} repo={r} />
          ))}
        </div>
      )}
    </div>
  );
}
