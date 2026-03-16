import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { Loader2, ArrowLeft } from 'lucide-react';

export function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!id) return;
      const docRef = doc(db, 'caseStudies', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCaseStudy(docSnap.data());
      }
      setLoading(false);
    };
    fetchCaseStudy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full" />
          <Loader2 className="h-12 w-12 text-rose-500 animate-spin relative z-10" />
        </div>
        <p className="mt-6 text-slate-600 dark:text-slate-300 font-medium tracking-widest uppercase text-sm">Ładowanie...</p>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-12 max-w-lg w-full text-center shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">Nie znaleziono</h2>
          <p className="text-slate-500 dark:text-slate-400 font-light mb-8">Przepraszamy, ale to case study nie istnieje lub zostało usunięte.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    );
  }

  return <CaseStudyTemplate {...caseStudy} />;
}
