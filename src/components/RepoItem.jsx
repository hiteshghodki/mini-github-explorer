export default function RepoItem({ repo }) {
    return (
      <div className="p-5 bg-gray-800/60 rounded-lg shadow-md border border-gray-700 hover:border-blue-500/40 hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-start">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-semibold text-blue-400 hover:text-blue-300 underline"
          >
            {repo.name}
          </a>
          <span className="text-yellow-400 text-sm">⭐ {repo.stargazers_count}</span>
        </div>
        {repo.description && (
          <p className="text-gray-400 mt-2 text-sm">{repo.description}</p>
        )}
      </div>
    );
  }
  