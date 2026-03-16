import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings2, CheckCircle2, ChevronRight, Calculator, Plus, Send, Loader2 } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import toast from 'react-hot-toast';

interface ScopeOption {
  id: string;
  title: string;
  description: string;
  priceDelta: number;
  timeDeltaDays: number;
  isRequired?: boolean;
}

interface ScopeConfiguratorProps {
  projectId: string;
  currentPrice: number;
  currentDays: number;
  options?: ScopeOption[];
}

const defaultOptions: ScopeOption[] = [
  { id: '1', title: 'Moduł Płatności (Stripe)', description: 'Integracja z bramką Stripe, subskrypcje, system fakturowania klienta.', priceDelta: 2500, timeDeltaDays: 5 },
  { id: '2', title: 'System Bloga / CMS', description: 'Rozbudowany system bloga oparty na Sanity.io lub Firebase, z edytorem tekstu.', priceDelta: 1800, timeDeltaDays: 4 },
  { id: '3', title: 'Zaawansowane SEO', description: 'Audyt, wdrażanie Schema.org, optymalizacja tagów meta, poprawa LCP.', priceDelta: 1200, timeDeltaDays: 3 },
  { id: '4', title: 'Aplikacja PWA', description: 'Offline support, instalacja na ekranie głównym, pushe notyfikacyjne.', priceDelta: 2000, timeDeltaDays: 5 },
  { id: 'base', title: 'Pakiet Podstawowy (Fundament)', description: 'Obecny zakres ustalony w umowie.', priceDelta: 0, timeDeltaDays: 0, isRequired: true }
];

export function ScopeConfigurator({ projectId, currentPrice, currentDays, options = defaultOptions }: ScopeConfiguratorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['base']);
  const [isSending, setIsSending] = useState(false);

  const toggleOption = (id: string) => {
    if (id === 'base') return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const calculatedPrice = currentPrice + selectedIds.reduce((sum, id) => sum + (options.find(o => o.id === id)?.priceDelta || 0), 0);
  const calculatedDays = currentDays + selectedIds.reduce((sum, id) => sum + (options.find(o => o.id === id)?.timeDeltaDays || 0), 0);

  const handleSendProposal = async () => {
    setIsSending(true);
    try {
      const selectedMods = options.filter(o => selectedIds.includes(o.id) && o.id !== 'base');
      
      await addDoc(collection(db, 'scopeProposals'), {
        projectId,
        modifications: selectedMods.map(m => m.title),
        estimatedNewPrice: calculatedPrice,
        estimatedNewDays: calculatedDays,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      toast.success("Propozycja zakresu wysłana! Opiekun skontaktuje się wkrótce.");
      // Optional: reset selection
      // setSelectedIds(['base']);
    } catch (e) {
      console.error(e);
      toast.error("Wystąpił błąd podczas wysyłania propozycji.");
    } finally {
      setIsSending(false);
    }
  };

  const hasModifications = selectedIds.length > 1;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Options List */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Scope Configurator</h3>
              <p className="text-sm text-slate-500 font-light">Eksperymentuj z nowymi modułami dla Twojego projektu.</p>
            </div>
          </div>

          <div className="space-y-4">
            {options.map((option) => {
              const isSelected = selectedIds.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  disabled={option.isRequired}
                  className={`w-full flex items-start p-4 rounded-2xl border transition-all text-left ${
                    isSelected 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30' 
                      : 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-500/20'
                  }`}
                >
                  <div className={`mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${
                    isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-bold ${isSelected ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-900 dark:text-white'}`}>
                        {option.title}
                      </h4>
                      {!option.isRequired && (
                        <div className="text-xs font-mono font-bold text-indigo-500">
                          +{option.priceDelta} PLN
                        </div>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${isSelected ? 'text-indigo-700/80 dark:text-indigo-300/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      {option.description}
                    </p>
                    {!option.isRequired && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-slate-900/50 rounded-lg text-xs font-medium text-slate-500">
                        <Plus className="w-3 h-3" /> {option.timeDeltaDays} dni do realizacji
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Summary panel */}
        <div className="w-full md:w-80">
          <div className="sticky top-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800">
             <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
               <Calculator className="w-4 h-4 text-slate-400" />
               Estymacja Budżetu
             </h4>

             <div className="space-y-4 mb-6">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-500">Baza projektu:</span>
                 <span className="font-mono font-bold text-slate-900 dark:text-white">{currentPrice} PLN</span>
               </div>
               
               {selectedIds.filter(id => id !== 'base').map(id => {
                 const opt = options.find(o => o.id === id);
                 return (
                   <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} key={id} className="flex justify-between items-center text-sm">
                     <span className="text-indigo-600 dark:text-indigo-400 line-clamp-1 flex-1 pr-2">+ {opt?.title}</span>
                     <span className="font-mono font-medium text-indigo-600 dark:text-indigo-400">+{opt?.priceDelta} PLN</span>
                   </motion.div>
                 );
               })}
             </div>

             <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mb-8">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Suma:</span>
                 <span className="text-2xl font-display font-bold text-slate-900 dark:text-white leading-none">{calculatedPrice} PLN</span>
               </div>
               <div className="flex justify-between items-center text-xs text-slate-500 mt-3">
                 <span>Szacowany czas:</span>
                 <span className="font-bold bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">~{calculatedDays} dni roboczych</span>
               </div>
             </div>

             <button 
               onClick={handleSendProposal}
               disabled={!hasModifications || isSending}
               className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
             >
               {isSending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                  <>
                    Wyślij propozycję
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
               )}
             </button>
             {!hasModifications && (
               <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Wybierz moduły by kontynuować</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
