import React, { useState } from 'react';
import { useClientOSStore } from '../hooks/useClientOSStore';
import { Lightbulb, ChevronDown, ChevronUp, X, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MicroLearningCardProps {
  triggerEvent: 'wireframe_review' | 'ui_review' | 'development_start' | 'deployment';
  onDismiss: () => void;
  onExpand?: () => void;
  userId?: string;
}

export function MicroLearningCard({ triggerEvent, onDismiss, onExpand, userId }: MicroLearningCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { dismissedLearningCards, dismissLearningCard } = useClientOSStore();

  const isDismissed = dismissedLearningCards.includes(triggerEvent);

  if (isDismissed) return null;

  // Static mock content for now, ideally retrieved from Firestore
  const learningLibrary = {
    wireframe_review: {
      title: "Jak oceniać makiety (Wireframes)?",
      time: 2,
      content: "Makiety skupiają się wyłącznie na układzie (layout) i architekturze informacji. Zignoruj kolory i fonty. Zadaj sobie pytanie: Czy wiem gdzie kliknąć, aby osiągnąć cel?"
    },
    ui_review: {
      title: "Na co zwrócić uwagę w designie UI?",
      time: 3,
      content: "Podczas weryfikacji warstwy wizualnej sprawdź, czy czytelność treści jest zachowana oraz czy design zgadza się z wizerunkiem Twojej marki."
    },
    development_start: {
      title: "Rozpoczynamy kodowanie",
      time: 2,
      content: "Development to proces przełożenia designu na kod. W tej fazie zmiany w wyglądzie są trudniejsze do wprowadzenia. Będziemy korzystać z platformy do stagingu."
    },
    deployment: {
      title: "Go-Live Checklist",
      time: 5,
      content: "Ostatnie kroki przed uruchomieniem. Pamiętaj o ustawieniu rekordów DNS i przygotowaniu kont dla administratorów."
    }
  };

  const currentLesson = learningLibrary[triggerEvent];
  if (!currentLesson) return null;

  const handleDismiss = () => {
    dismissLearningCard(triggerEvent, userId);
    onDismiss();
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl overflow-hidden shadow-sm">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/50 dark:hover:bg-slate-900/50 transition-colors"
        onClick={() => {
          setExpanded(!expanded);
          if (!expanded && onExpand) onExpand();
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/30 flex items-center justify-center text-indigo-500">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              {currentLesson.title}
              <span className="text-[10px] bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                {currentLesson.time} min
              </span>
            </h4>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-indigo-400">
          <button 
            onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
            className="p-1.5 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 rounded-lg transition-colors"
            title="Nie pokazuj ponownie"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="p-1.5 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 rounded-lg transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/50 dark:bg-slate-900/50 border-t border-indigo-100 dark:border-indigo-500/20"
          >
            <div className="p-4 pl-15 text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="mb-4">{currentLesson.content}</p>
              <button className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:text-indigo-500 uppercase tracking-widest group">
                <PlayCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Odpal video intro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
