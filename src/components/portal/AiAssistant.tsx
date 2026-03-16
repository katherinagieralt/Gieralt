import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, User, Loader2, Send, Sparkles } from 'lucide-react';

interface AiAssistantProps {
  showAIChat: boolean;
  setShowAIChat: (show: boolean) => void;
  aiMessages: { role: string, text: string }[];
  aiInput: string;
  setAiInput: (input: string) => void;
  handleSendAiMessage: (e: React.FormEvent) => void;
  isAiTyping: boolean;
}

export function AiAssistant({ showAIChat, setShowAIChat, aiMessages, aiInput, setAiInput, handleSendAiMessage, isAiTyping }: AiAssistantProps) {
  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* AI Chat Header */}
            <div className="p-4 bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm">Asystent Projektu AI</div>
                  <div className="text-[10px] text-slate-400">Zasilany przez Gemini</div>
                </div>
              </div>
              <button 
                onClick={() => setShowAIChat(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* AI Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-rose-100 dark:bg-rose-500/20'}`}>
                      {msg.role === 'user' ? <User className="h-3 w-3 text-blue-600" /> : <Bot className="h-3 w-3 text-rose-600" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-500 text-white rounded-tr-none' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center shrink-0">
                      <Bot className="h-3 w-3 text-rose-600" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                      <Loader2 className="h-4 w-4 text-rose-500 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Chat Input */}
            <form onSubmit={handleSendAiMessage} className="p-4 border-t border-slate-100 dark:border-slate-800">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Zapytaj o projekt..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!aiInput.trim() || isAiTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowAIChat(!showAIChat)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          showAIChat ? 'bg-slate-900 dark:bg-slate-800 rotate-90' : 'bg-rose-500 hover:bg-rose-600 hover:scale-110'
        }`}
      >
        {showAIChat ? <X className="h-6 w-6 text-white" /> : <Sparkles className="h-6 w-6 text-white" />}
        {!showAIChat && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-white dark:border-slate-950"></span>
          </span>
        )}
      </button>
    </div>
  );
}
