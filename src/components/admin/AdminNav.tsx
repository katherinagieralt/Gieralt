import { Database, Briefcase, MessageSquare, Mail, Users, BookOpen, Star, Layout, Sparkles, Search } from "lucide-react";
import { AdminTab, useAdminStore } from "../../stores/useAdminStore";

interface AdminNavProps {
  counts: {
    submissions: number;
    signups: number;
    blogPosts: number;
    portfolioItems: number;
    testimonials: number;
    clientProjects: number;
    unreadMessages: boolean;
  };
  newLeadCount: number;
}

const TABS: { id: AdminTab; icon: React.ElementType; label: (c: AdminNavProps['counts']) => string }[] = [
  { id: "dashboard", icon: Database, label: () => "Przegląd" },
  { id: "analytics", icon: Layout, label: () => "Analityka" },
  { id: "client_projects", icon: Briefcase, label: (c) => `Klienci (${c.clientProjects})` },
  { id: "messages", icon: MessageSquare, label: () => "Wiadomości" },
  { id: "submissions", icon: Mail, label: (c) => `Zgłoszenia (${c.submissions})` },
  { id: "signups", icon: Users, label: (c) => `Newsletter (${c.signups})` },
  { id: "blog", icon: BookOpen, label: (c) => `Blog (${c.blogPosts})` },
  { id: "portfolio", icon: Sparkles, label: (c) => `Portfolio (${c.portfolioItems})` },
  { id: "testimonials", icon: Star, label: (c) => `Opinie (${c.testimonials})` },
  { id: "ai_strategy", icon: Sparkles, label: () => "AI Strategy" },
  { id: "seo_monitoring", icon: Search, label: () => "SEO" },
];

export function AdminNav({ counts, newLeadCount }: AdminNavProps) {
  const { activeTab, setActiveTab } = useAdminStore();

  return (
    <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto scrollbar-hide">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const showBadge = tab.id === "submissions" && newLeadCount > 0;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap relative ${
              isActive
                ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500 shadow-sm border border-rose-100 dark:border-rose-500/20"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label(counts)}</span>
            {tab.id === "messages" && counts.unreadMessages && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            )}
            {showBadge && (
              <span className="ml-1 px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full">
                {newLeadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
