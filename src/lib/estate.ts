/** AletheLabs estate — GitLab SoT; GitHub twin. Do not invent a second estate. */
export type RepoHost = "gitlab" | "github";
export type RepoKind = "cac" | "sac" | "trestle" | "ssg" | "c2p" | "dadsoc" | "playbook" | "infra";
export type GateState = "open" | "fail-closed" | "exception" | "pending-hitl";

export interface EstateRepo {
  id: string; name: string; kind: RepoKind; gitlabPath: string; githubTwin: string;
  description: string; branch: string; lastSync: string; gate: GateState; controls: string[];
}
export interface EstateSystem {
  id: string; acronym: string; name: string; impact: "L" | "M" | "H";
  overlays: string[]; primaryRepoId: string; status: "design" | "build" | "assess-only" | "ops";
}

export const ESTATE_REPOS: EstateRepo[] = [
  { id: "trestle-serf", name: "SERF Trestle Workspace", kind: "trestle", gitlabPath: "alethe/compliance/trestle-serf", githubTwin: "AletheLabs/trestle-serf", description: "OSCAL authoring (catalogs, profiles, component-defs, SSPs). Generate → edit md → assemble.", branch: "main", lastSync: "2026-10-27T18:00:00Z", gate: "open", controls: ["CM-2", "CM-6", "SA-11", "SI-2"] },
  { id: "ssg-rhel9", name: "SSG / ComplianceAsCode RHEL9", kind: "ssg", gitlabPath: "alethe/cac/ssg-rhel9", githubTwin: "ComplianceAsCode/content", description: "SCAP datastreams, STIG/NIST 800-53 profiles, Ansible remediations for RHEL9.", branch: "master", lastSync: "2026-10-26T12:00:00Z", gate: "open", controls: ["CM-6", "CM-7", "SI-2", "SI-3"] },
  { id: "c2p-bridge", name: "Compliance-to-Policy (C2P)", kind: "c2p", gitlabPath: "alethe/cac/c2p-bridge", githubTwin: "AletheLabs/c2p-bridge", description: "Maps OSCAL controls to policy-as-code (OPA/Kyverno) and runtime gates.", branch: "main", lastSync: "2026-10-27T09:30:00Z", gate: "pending-hitl", controls: ["AC-3", "AC-6", "CM-3", "CM-5"] },
  { id: "dadsoc-playbooks", name: "DADSOC Agentic Playbooks", kind: "dadsoc", gitlabPath: "alethe/soc/dadsoc-playbooks", githubTwin: "AletheLabs/dadsoc-playbooks", description: "NIST 800-61r3 / CSF 2.0 IR playbooks chained to Detect-Triage-Hunt-Respond agents.", branch: "main", lastSync: "2026-10-28T06:00:00Z", gate: "open", controls: ["IR-4", "IR-5", "IR-6", "SI-4"] },
  { id: "ssg-stig-ansible", name: "STIG Ansible Remediations", kind: "cac", gitlabPath: "alethe/cac/stig-ansible", githubTwin: "AletheLabs/stig-ansible", description: "Generated Ansible from SSG for air-gapped remediation runs.", branch: "main", lastSync: "2026-10-25T22:00:00Z", gate: "fail-closed", controls: ["CM-6", "CM-7"] },
  { id: "oss-soc-ref", name: "OSS SOC Reference Stack", kind: "sac", gitlabPath: "alethe/soc/oss-soc-ref", githubTwin: "AletheLabs/oss-soc-ref", description: "Wazuh, TheHive, MISP, OpenCTI, Velociraptor, Shuffle wiring for air-gapped enclaves.", branch: "main", lastSync: "2026-10-27T14:00:00Z", gate: "open", controls: ["SI-4", "AU-6", "IR-4"] },
];

export const ESTATE_SYSTEMS: EstateSystem[] = [
  { id: "sys-serf", acronym: "SERF", name: "Software Factory Reference Platform", impact: "M", overlays: ["CNSSI 1253", "DoD Cloud SRG"], primaryRepoId: "trestle-serf", status: "build" },
  { id: "sys-dadsoc", acronym: "DADSOC", name: "DoD Agentic SOC Reference", impact: "M", overlays: ["CNSSI 1253", "NIST CSF 2.0"], primaryRepoId: "dadsoc-playbooks", status: "design" },
];

export function repoById(id: string) { return ESTATE_REPOS.find((r) => r.id === id); }
export function gateLabel(g: GateState): string {
  const m: Record<GateState, string> = { open: "Open", "fail-closed": "Fail-closed", exception: "Exception", "pending-hitl": "Pending HITL" };
  return m[g];
}
