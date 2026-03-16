import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences } from '../types';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

interface ClientOSState extends UserPreferences {
  setMode: (mode: 'focus' | 'pro', userId?: string) => Promise<void>;
  dismissLearningCard: (cardId: string, userId?: string) => Promise<void>;
  setAiNarratorEnabled: (enabled: boolean, userId?: string) => Promise<void>;
  hydrateFromFirestore: (preferences: Partial<UserPreferences>) => void;
}

export const useClientOSStore = create<ClientOSState>()(
  persist(
    (set, get) => ({
      clientOSMode: 'focus',
      dismissedLearningCards: [],
      aiNarratorEnabled: true,

      setMode: async (mode, userId) => {
        set({ clientOSMode: mode });
        if (userId) {
          try {
            await setDoc(doc(db, 'users', userId, 'preferences', 'clientOS'), { clientOSMode: mode }, { merge: true });
          } catch (e) {
            console.error('Failed to sync mode to Firestore', e);
          }
        }
      },

      dismissLearningCard: async (cardId, userId) => {
        const newCards = [...get().dismissedLearningCards, cardId];
        set({ dismissedLearningCards: newCards });
        if (userId) {
          try {
            await setDoc(doc(db, 'users', userId, 'preferences', 'clientOS'), { dismissedLearningCards: newCards }, { merge: true });
          } catch (e) {
            console.error('Failed to sync dismissed cards to Firestore', e);
          }
        }
      },

      setAiNarratorEnabled: async (enabled, userId) => {
        set({ aiNarratorEnabled: enabled });
        if (userId) {
          try {
            await setDoc(doc(db, 'users', userId, 'preferences', 'clientOS'), { aiNarratorEnabled: enabled }, { merge: true });
          } catch (e) {
            console.error('Failed to sync ai settings to Firestore', e);
          }
        }
      },

      hydrateFromFirestore: (preferences) => {
        set((state) => ({ ...state, ...preferences }));
      }
    }),
    {
      name: 'client-os-storage',
      partialize: (state) => ({ clientOSMode: state.clientOSMode })
    }
  )
);
