import { ESTATE_REPOS, type EstateRepo, type RepoHost } from "./estate";
export function gitlabUrl(repo: EstateRepo) { return `https://gitlab.com/${repo.gitlabPath}`; }
export function githubUrl(repo: EstateRepo) { return `https://github.com/${repo.githubTwin}`; }
export function twinUrl(repo: EstateRepo, host: RepoHost) { return host === "gitlab" ? gitlabUrl(repo) : githubUrl(repo); }
export function listByKind(kind: EstateRepo["kind"]) { return ESTATE_REPOS.filter((r) => r.kind === kind); }
export function pendingHitlRepos() { return ESTATE_REPOS.filter((r) => r.gate === "pending-hitl" || r.gate === "fail-closed"); }
export function searchRepos(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return ESTATE_REPOS;
  return ESTATE_REPOS.filter((r) =>
    r.name.toLowerCase().includes(t) || r.id.includes(t) || r.gitlabPath.toLowerCase().includes(t) ||
    r.githubTwin.toLowerCase().includes(t) || r.kind.includes(t) || r.controls.some((c) => c.toLowerCase().includes(t))
  );
}
