import { useState } from "react";
import { UserProvider, useUser } from "./context/UserContext";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoSection from "./components/RepoSection";

function SearchAndFetch({ setLoading, setError, loading }) {
  const { setUser, setRepos } = useUser();

  async function handleSearch(username) {
    setError(null);
    setLoading(true);
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (userRes.status === 404) {
        setError("User not found. Check the username and try again.");
        setLoading(false);
        return;
      }
      const userData = await userRes.json();
      setUser(userData);

      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const reposData = await reposRes.json();
      if (reposData.length === 0) setError("No public repositories found.");
      setRepos(reposData);
    } catch (err) {
      setError("Network error or rate limit reached. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return <SearchBar onSearch={handleSearch} loading={loading} />;
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <header className="text-center py-12">
          <h1 className="text-transperent text-4xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 drop-shadow-md">
            Mini GitHub Explorer
          </h1>
          <p className="text-gray-300 mt-2">
            Search any GitHub user & explore their repositories
          </p>
        </header>

        <main className="max-w-4xl mx-auto space-y-8 px-4">
          <SearchAndFetch
            setLoading={setLoading}
            setError={setError}
            loading={loading}
          />

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-400 text-red-200 rounded-lg text-center animate-fadeIn">
              {error}
            </div>
          )}

          <ProfileCard />
          <RepoSection loading={loading} />
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          Built with ❤️ using React + GitHub API
        </footer>
      </div>
    </UserProvider>
  );
}
