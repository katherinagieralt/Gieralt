import React, { useState } from 'react';
import { Sparkles, FileText, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { generateTripleDoc, TripleDocResult } from '../services/aiLeadService';
import { collection, query, orderBy, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

interface ProjectData {
  id: string;
  name: string;
  status: string;
  phases?: any[];
}

interface TripleDocGeneratorProps {
  project: ProjectData;
  onClose?: () => void;
}

export function TripleDocGenerator({ project, onClose }: TripleDocGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TripleDocResult | null>(null);
  const [activeTab, setActiveTab] = useState<'technical' | 'caseStudy' | 'lessonsLearned'>('caseStudy');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // 1. Fetch activity logs
      const logsQuery = query(collection(db, `projects/${project.id}/activityLog`), orderBy('timestamp', 'asc'));
      const snapshot = await getDocs(logsQuery);
      const logs = snapshot.docs.map(doc => doc.data());

      // 2. Generate Triple Doc
      const docResult = await generateTripleDoc(project, logs);
      if (docResult) {
        setResult(docResult);
      } else {
         toast.error("Nie udało się wygenerować dokumentacji.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Wystąpił błąd podczas generowania dokumentacji.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFirebase = async () => {
    if (!result) return;
    try {
       await setDoc(doc(db, `projects/${project.id}/documentation`, "triple_doc"), {
          ...result,
          updatedAt: serverTimestamp()
       });
       toast.success("Dokumentacja zapisana pomyślnie w panelu klienta!");
    } catch(e) {
       console.error(e);
       toast.error("Błąd zapisu w Firebase.");
    }
  };
  
  const handleExportTxt = () => {
    if (!result) return;
    const content = `=== CASE STUDY ===\n${result.caseStudy}\n\n=== DOKUMENTACJA TECHNICZNA ===\n${result.technical}\n\n=== LESSONS LEARNED ===\n${result.lessonsLearned}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `TripleDoc_${project.name.replace(/\s+/g, '_')}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full p-6 shadow-sm flex flex-col h-[70vh]">
      <div className="flex justify-between items-center mb-6">
         <div>
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
               <FileText className="w-5 h-5 text-rose-500" />
               Triple Doc Generator
            </h3>
            <p className="text-sm text-slate-500 font-light mt-1">Generuj dokumentację dla projektu: {project.name}</p>
         </div>
         {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium">
               Zamknij
            </button>
         )}
      </div>

      {!result && !loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
           <div className="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-rose-500" />
           </div>
           <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Automatyczna Dokumentacja</h4>
           <p className="text-sm text-slate-500 font-light mb-6 max-w-md">System przeanalizuje publiczne i prywatne (isPrivate) logi aktywności by wygenerować Case Study, Dokumentację Techniczną oraz Wnioski (Lessons Learned).</p>
           <button 
             onClick={handleGenerate}
             className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 hover:opacity-90"
           >
             <Sparkles className="w-4 h-4" />
             Generuj Triple Doc używając Gemini
           </button>
        </div>
      ) : loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
           <Loader2 className="w-8 h-8 text-rose-500 animate-spin mb-4" />
           <p className="text-slate-500 animate-pulse text-sm">Analizuję dane projektu we wszystkich fazach...</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col min-h-0">
           {/* Tabs */}
           <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
             <button onClick={() => setActiveTab('caseStudy')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'caseStudy' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Case Study</button>
             <button onClick={() => setActiveTab('technical')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'technical' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Dokumentacja Techniczna</button>
             <button onClick={() => setActiveTab('lessonsLearned')} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'lessonsLearned' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Lessons Learned</button>
           </div>
           
           <div className="flex-1 overflow-y-auto w-full p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">
             {result && result[activeTab]}
           </div>

           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
             <button onClick={handleExportTxt} className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <Download className="w-4 h-4" /> Eksportuj .txt
             </button>
             <button onClick={handleSaveToFirebase} className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Zapisz w Portalu Klienta
             </button>
           </div>
        </motion.div>
      )}
    </div>
  );
}
