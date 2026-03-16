import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// All valid admin tabs
export type AdminTab =
  | 'dashboard'
  | 'analytics'
  | 'submissions'
  | 'signups'
  | 'blog'
  | 'portfolio'
  | 'testimonials'
  | 'client_projects'
  | 'messages'
  | 'ai_strategy'
  | 'seo_monitoring'
  | 'accounts';

export type ClientSubTab = 'projects' | 'proposals';

interface AdminState {
  // Navigation
  activeTab: AdminTab;
  clientSubTab: ClientSubTab;
  setActiveTab: (tab: AdminTab) => void;
  setClientSubTab: (sub: ClientSubTab) => void;

  // UI state
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;

  // Search/filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Selected items
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // Navigation
      activeTab: 'dashboard',
      clientSubTab: 'projects',
      setActiveTab: (tab) => set({ activeTab: tab, searchQuery: '' }),
      setClientSubTab: (sub) => set({ clientSubTab: sub }),

      // UI state
      showNotifications: false,
      setShowNotifications: (show) => set({ showNotifications: show }),

      // Search/filter
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      // Selected items
      selectedProjectId: null,
      setSelectedProjectId: (id) => set({ selectedProjectId: id }),
    }),
    {
      name: 'admin-ui-storage',
      // Only persist tab selection between sessions
      partialize: (state) => ({
        activeTab: state.activeTab,
        clientSubTab: state.clientSubTab,
      }),
    }
  )
);
