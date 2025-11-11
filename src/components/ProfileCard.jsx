import { useUser } from "../context/UserContext";

export default function ProfileCard() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-28 h-28 rounded-full ring-2 ring-blue-500 shadow-lg"
      />
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-white">{user.name || user.login}</h2>
        <p className="text-gray-400 mt-1">@{user.login}</p>
        {user.bio && <p className="text-gray-300 mt-3 italic">{user.bio}</p>}
        <div className="mt-3 flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-gray-400">
          <span>📦 Public Repos: {user.public_repos}</span>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            View Profile ↗
          </a>
        </div>
      </div>
    </div>
  );
}
