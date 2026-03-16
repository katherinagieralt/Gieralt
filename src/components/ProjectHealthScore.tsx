import { useMemo } from "react";
import { Timestamp } from "firebase/firestore";
import { orderBy, limit } from "firebase/firestore";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";
import { motion } from "motion/react";
import { Activity, AlertTriangle, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface ClientProject {
  id: string;
  name: string;
  clientEmail: string;
  progress: number;
  estimatedCompletion: string;
  currentPhase: string;
  status: string;
}

type HealthStatus = "on-track" | "at-risk" | "delayed";

interface ProjectHealth {
  project: ClientProject;
  status: HealthStatus;
  reason: string;
  score: number;
}

function calculateHealth(project: ClientProject): ProjectHealth {
  const today = new Date();
  const completion = project.estimatedCompletion ? new Date(project.estimatedCompletion) : null;
  const daysLeft = completion ? Math.round((completion.getTime() - today.getTime()) / 86400000) : null;
  const progress = project.progress ?? 0;

  // Delayed: past estimated date and not done
  if (daysLeft !== null && daysLeft < 0 && progress < 100) {
    return {
      project,
      status: "delayed",
      reason: `Termin minął ${Math.abs(daysLeft)} dni temu (postęp: ${progress}%)`,
      score: 0,
    };
  }
  // At risk: less than 7 days left and less than 70% done, OR less than 5 days left
  if (
    (daysLeft !== null && daysLeft <= 7 && progress < 70) ||
    (daysLeft !== null && daysLeft <= 5 && progress < 90)
  ) {
    return {
      project,
      status: "at-risk",
      reason: `${daysLeft} dni do terminu, postęp: ${progress}%`,
      score: 40,
    };
  }

  return {
    project,
    status: "on-track",
    reason: `${daysLeft !== null ? `${daysLeft} dni do terminu` : "Brak terminu"}, postęp: ${progress}%`,
    score: 100,
  };
}

const statusConfig: Record<HealthStatus, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  "on-track": {
    label: "Na Czas",
    color: "text-emerald-600 dark:text-emerald-400",
    icon: <CheckCircle2 className="w-4 h-4" />,
    bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
  },
  "at-risk": {
    label: "Zagrożony",
    color: "text-amber-600 dark:text-amber-400",
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
  },
  delayed: {
    label: "Opóźniony",
    color: "text-rose-600 dark:text-rose-400",
    icon: <XCircle className="w-4 h-4" />,
    bg: "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
  },
};

export function ProjectHealthScore() {
  const { data: projects = [], isLoading } = useFirestoreQuery<ClientProject>(
    ["clientProjectsHealth"],
    "client_projects",
    [orderBy("estimatedCompletion", "asc"), limit(20)]
  );

  const healthData = useMemo(
    () =>
      projects
        .map(calculateHealth)
        .sort((a, b) => a.score - b.score) // worst first
        .slice(0, 6),
    [projects]
  );

  const delayed = healthData.filter((h) => h.status === "delayed").length;
  const atRisk = healthData.filter((h) => h.status === "at-risk").length;
  const onTrack = healthData.filter((h) => h.status === "on-track").length;

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-center min-h-[120px]">
        <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-50 dark:bg-violet-500/10 rounded-xl flex items-center justify-center">
            <Activity className="w-4 h-4 text-violet-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Health Score Projektów</h3>
            <p className="text-xs text-slate-500">{projects.length} aktywnych projektów</p>
          </div>
        </div>
        {/* Summary pills */}
        <div className="flex items-center gap-2">
          {delayed > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold">
              <XCircle className="w-3 h-3" /> {delayed}
            </span>
          )}
          {atRisk > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <AlertTriangle className="w-3 h-3" /> {atRisk}
            </span>
          )}
          {onTrack > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-3 h-3" /> {onTrack}
            </span>
          )}
        </div>
      </div>

      {/* Project list */}
      <div className="space-y-2">
        {healthData.map(({ project, status, reason }) => {
          const cfg = statusConfig[status];
          return (
            <div
              key={project.id}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border ${cfg.bg} transition-all`}
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{project.name}</p>
                <p className="text-xs text-slate-500 truncate">{project.clientEmail}</p>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold shrink-0 ${cfg.color}`}>
                {cfg.icon}
                <span className="hidden sm:inline">{cfg.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
