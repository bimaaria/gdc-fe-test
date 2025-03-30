import { Repository } from "../types/repository"

interface UserRepositoriesProps {
  repositories: Repository[]
}

const languageColor: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  CPlusPlus: "#f34b7d",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Go: "#00ADD8",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Markdown: "#083fa1",
  JSON: "#dc322f",
  XML: "#0060ac",
  Dockerfile: "#384d54",
  YAML: "#cb171e",
  Unsampled: "#ffffff",
}

export default function UserRepositories({ repositories }: UserRepositoriesProps) {
    return (
      <div className="w-full">
        <h3 className="text-xl font-bold mb-4">Top 10 Repositories</h3>
        {repositories?.length > 0 ? (
          <div className="w-full flex flex-wrap gap-4">
            {repositories.map((repo) => (
              <div key={repo.id} className="w-full border border-white rounded-sm p-4 md:w-[45%] lg:w-[23%]">
                <p className="font-bold text-xl overflow-hidden text-ellipsis">{repo.name}</p>
                <p className="overflow-hidden text-ellipsis">{repo.description}</p>
                <p>{repo.stargazers_count} stars</p>
                <p>{repo.forks} forks</p>
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-[50%]"
                    style={{ backgroundColor: languageColor[repo.language || "Unsampled"] || "#ffffff" }}
                  />
                  <p>{repo.language || "-"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No repositories found for this user.</p>
        )}
      </div>
    )
}