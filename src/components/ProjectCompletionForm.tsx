import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Loader2, CheckCircle, FileText, Target, Lightbulb, TrendingUp, Image as ImageIcon } from 'lucide-react';

export function ProjectCompletionForm({ projectId }: { projectId: string }) {
  const [formData, setFormData] = useState({
    title: '',
    challenge: '',
    solution: '',
    results: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'caseStudies'), {
        ...formData,
        projectId,
        createdAt: Timestamp.now()
      });
      
      // Notify client
      await addDoc(collection(db, 'notifications'), {
        type: 'case_study_ready',
        projectId,
        caseStudyId: docRef.id,
        createdAt: Timestamp.now(),
        read: false
      });
      
      setSuccess(true);
    } catch (error) {
      console.error('Error saving case study:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">Case study zapisane pomyślnie!</h3>
        <p className="text-slate-700 dark:text-slate-300 font-light">Klient został powiadomiony o nowym case study.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Nowe Case Study</h3>
        <p className="text-slate-600 dark:text-slate-300 font-light">Wypełnij poniższe pola, aby wygenerować case study dla tego projektu.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-rose-500" />
            Tytuł
          </label>
          <input 
            type="text" 
            placeholder="Wprowadź tytuł case study..." 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all outline-none" 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-rose-500" />
            Wyzwanie
          </label>
          <textarea 
            placeholder="Opisz wyzwanie, z jakim zmagał się klient..." 
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all outline-none resize-none" 
            onChange={e => setFormData({...formData, challenge: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Rozwiązanie
          </label>
          <textarea 
            placeholder="Jakie rozwiązanie zostało wdrożone?" 
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all outline-none resize-none" 
            onChange={e => setFormData({...formData, solution: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Wyniki
          </label>
          <textarea 
            placeholder="Jakie były efekty wdrożenia?" 
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all outline-none resize-none" 
            onChange={e => setFormData({...formData, results: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-sky-500" />
            URL obrazka wyróżniającego
          </label>
          <input 
            type="url" 
            placeholder="https://..." 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all outline-none" 
            onChange={e => setFormData({...formData, image: e.target.value})} 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Zapisywanie...
            </>
          ) : (
            'Zapisz Case Study'
          )}
        </button>
      </div>
    </form>
  );
}
