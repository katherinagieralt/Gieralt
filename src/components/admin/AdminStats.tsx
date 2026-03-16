import { motion } from "motion/react";
import { Mail, Users, BookOpen, Briefcase, Star, DollarSign } from "lucide-react";

interface AdminStatsProps {
  submissionsCount: number;
  signupsCount: number;
  blogCount: number;
  portfolioCount: number;
  testimonialsCount: number;
  activeProjectsCount: number;
}

const stats = (props: AdminStatsProps) => [
  {
    icon: Mail,
    label: "Zgłoszenia",
    value: props.submissionsCount,
    color: "rose",
    suffix: "",
  },
  {
    icon: Users,
    label: "Newsletter",
    value: props.signupsCount,
    color: "blue",
    suffix: "",
  },
  {
    icon: BookOpen,
    label: "Artykuły",
    value: props.blogCount,
    color: "violet",
    suffix: "",
  },
  {
    icon: Briefcase,
    label: "Portfolio",
    value: props.portfolioCount,
    color: "amber",
    suffix: "",
  },
  {
    icon: Star,
    label: "Opinie",
    value: props.testimonialsCount,
    color: "emerald",
    suffix: "",
  },
  {
    icon: DollarSign,
    label: "Aktywne projekty",
    value: props.activeProjectsCount,
    color: "indigo",
    suffix: "",
  },
];

export function AdminStats(props: AdminStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats(props).map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div
            className={`w-8 h-8 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10 flex items-center justify-center mb-3`}
          >
            <stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
          </div>
          <div className="text-2xl font-display font-bold text-slate-900 dark:text-white leading-none mb-1">
            {stat.value}
            {stat.suffix}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
