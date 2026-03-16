import { describe, it, expect, beforeEach } from 'vitest';
import { useAdminStore } from '../stores/useAdminStore';

describe('useAdminStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useAdminStore.setState({
      activeTab: 'dashboard',
      clientSubTab: 'projects',
      showNotifications: false,
      searchQuery: '',
      selectedProjectId: null,
    });
  });

  it('starts with dashboard as the active tab', () => {
    const { activeTab } = useAdminStore.getState();
    expect(activeTab).toBe('dashboard');
  });

  it('setActiveTab changes the active tab', () => {
    const { setActiveTab } = useAdminStore.getState();
    setActiveTab('blog');
    expect(useAdminStore.getState().activeTab).toBe('blog');
  });

  it('setActiveTab resets the searchQuery', () => {
    useAdminStore.setState({ searchQuery: 'test' });
    const { setActiveTab } = useAdminStore.getState();
    setActiveTab('submissions');
    expect(useAdminStore.getState().searchQuery).toBe('');
    expect(useAdminStore.getState().activeTab).toBe('submissions');
  });

  it('setClientSubTab switches between projects and proposals', () => {
    const { setClientSubTab } = useAdminStore.getState();
    setClientSubTab('proposals');
    expect(useAdminStore.getState().clientSubTab).toBe('proposals');
  });

  it('toggles showNotifications', () => {
    const { setShowNotifications } = useAdminStore.getState();
    setShowNotifications(true);
    expect(useAdminStore.getState().showNotifications).toBe(true);
    setShowNotifications(false);
    expect(useAdminStore.getState().showNotifications).toBe(false);
  });

  it('setSelectedProjectId stores correct ID', () => {
    const { setSelectedProjectId } = useAdminStore.getState();
    setSelectedProjectId('proj-123');
    expect(useAdminStore.getState().selectedProjectId).toBe('proj-123');
  });

  it('setSelectedProjectId can be cleared to null', () => {
    useAdminStore.setState({ selectedProjectId: 'proj-123' });
    const { setSelectedProjectId } = useAdminStore.getState();
    setSelectedProjectId(null);
    expect(useAdminStore.getState().selectedProjectId).toBeNull();
  });

  it('searchQuery can be updated', () => {
    const { setSearchQuery } = useAdminStore.getState();
    setSearchQuery('gieralt');
    expect(useAdminStore.getState().searchQuery).toBe('gieralt');
  });
});
