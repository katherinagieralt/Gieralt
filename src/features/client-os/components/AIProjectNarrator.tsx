import React, { useEffect, useState } from 'react';
import { Timestamp, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { generateProjectNarrative } from '../../../services/aiLeadService';
import { Sparkles, ArrowRight, Loader2, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AIProjectNarratorProps {
  projectId: string;
  lastActivity?: Timestamp;
}

interface NarrativeState {
  status: 'success' | 'warning' | 'info';
  narrative: string;
  actionLabel: string;
  actionUrl?: string;
}

export function AIProjectNarrator({ projectId, lastActivity }: AIProjectNarratorProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<NarrativeState | null>(null);

  useEffect(() => {
    const fetchNarrative = async () => {
      // Check cache to avoid regenerating every reload (valid for 24h)
      const cacheKey = `narrative_${projectId}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        // 24 hours = 86400000 ms
        if (age < 86400000 && !lastActivity) {
          setData(parsed.data);
          setLoading(false);
          return;
        }
      }

      try {
        // Assume project info is fetched separately, here we mock standard context
        const projectMock = { currentPhase: 'Design UI', progress: 40 }; 
        const logs: any[] = [];
        
        try {
          const logsQuery = query(collection(db, `projects/${projectId}/activityLog`), orderBy('timestamp', 'desc'), limit(20));
          const snapshot = await getDocs(logsQuery);
          snapshot.forEach(doc => {
            const data = doc.data();
            if (data.isPrivate !== true) {
              logs.push(data);
            }
          });
          // Limit to 5 after filtering
          logs.splice(5);
        } catch (e) {
            console.warn("Could not fetch logs, relying on UI state only");
        }

        const result = await generateProjectNarrative(projectMock, logs);
        if (result) {
          setData(result);
          localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
        } else {
          // Fallback UI
          setData({
             status: 'info',
             narrative: 'Pracuję nad optymalizacją procesu. Zbieram dane o kolejnych krokach dla Twojego projektu.',
             actionLabel: 'Zobacz harmonogram'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNarrative();
  }, [projectId, lastActivity]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-start gap-4 animate-pulse">
         <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
         <div className="flex-1 space-y-3">
           <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
           <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
           <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-32 mt-4" />
         </div>
      </div>
    );
  }

  if (!data) return null;

  const getStatusIcon = () => {
    switch (data.status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'info':
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case 'success': return "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20";
      case 'warning': return "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20";
      case 'info':
      default: return "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-6 border shadow-sm relative overflow-hidden group ${getStatusColor()}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 dark:bg-white/5 blur-3xl -mr-10 -mt-10 rounded-full" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0">
          {getStatusIcon()}
        </div>
        <div className="flex-1">
           <div className="flex items-center gap-2 mb-2">
             <Sparkles className="w-3 h-3 text-slate-400" />
             <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">Podsumowanie AI</span>
           </div>
           
           <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-4">
             {data.narrative}
           </p>

           <button className="flex items-center gap-2 text-sm font-bold bg-white dark:bg-slate-800 px-4 py-2 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all text-left">
             {data.actionLabel}
             <ArrowRight className="w-4 h-4 text-slate-400" />
           </button>
        </div>
      </div>
    </motion.div>
  );
}
