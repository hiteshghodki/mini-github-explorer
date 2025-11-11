import { useUser } from "../context/UserContext";
import RepoList from "./RepoList";

export default function RepoSection({ loading }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-semibold text-blue-400 mb-3 border-b border-gray-700 pb-2">
        Repositories
      </h3>
      {loading ? (
        <div className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-opacity-70"></div>
        </div>
      ) : (
        <RepoList />
      )}
    </section>
  );
}
