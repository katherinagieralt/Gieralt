import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Loader2, Send } from 'lucide-react';

interface FeedbackChatProps {
  messages: any[];
  sending: boolean;
  newMessage: string;
  setNewMessage: (msg: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export function FeedbackChat({ messages, sending, newMessage, setNewMessage, onSendMessage }: FeedbackChatProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[500px]"
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <h2 className="font-display font-semibold">Feedback i Komunikacja</h2>
          {messages.length > 0 && messages[messages.length - 1].sender === 'admin' && (
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </div>
        <div className="text-xs text-slate-500">Zadaj pytanie lub zostaw uwagę</div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Brak wiadomości. Napisz do nas, jeśli masz jakieś uwagi!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                msg.sender === "client" 
                  ? "bg-blue-500 text-white rounded-tr-none" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none"
              }`}>
                <div className="mb-1">{msg.message}</div>
                <div className={`text-[10px] opacity-70 text-right`}>
                  {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={onSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Napisz wiadomość..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <button 
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
