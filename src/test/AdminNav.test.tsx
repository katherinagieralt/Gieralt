import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminNav } from '../components/admin/AdminNav';
import { useAdminStore } from '../stores/useAdminStore';

const defaultCounts = {
  submissions: 5,
  signups: 12,
  blogPosts: 3,
  portfolioItems: 8,
  testimonials: 4,
  clientProjects: 2,
  unreadMessages: false,
};

describe('AdminNav', () => {
  beforeEach(() => {
    useAdminStore.setState({
      activeTab: 'dashboard',
      clientSubTab: 'projects',
      showNotifications: false,
      searchQuery: '',
      selectedProjectId: null,
    });
  });

  it('renders the Przegląd (dashboard) tab', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={0} />);
    expect(screen.getByText('Przegląd')).toBeInTheDocument();
  });

  it('renders the Blog tab with count', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={0} />);
    expect(screen.getByText('Blog (3)')).toBeInTheDocument();
  });

  it('renders the Klienci tab with count', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={0} />);
    expect(screen.getByText('Klienci (2)')).toBeInTheDocument();
  });

  it('clicking a tab updates the Zustand activeTab', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={0} />);
    const blogTab = screen.getByText('Blog (3)').closest('button')!;
    fireEvent.click(blogTab);
    expect(useAdminStore.getState().activeTab).toBe('blog');
  });

  it('clicking Submissions tab updates activeTab to submissions', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={0} />);
    const submissionsTab = screen.getByText(/Zgłoszenia/i).closest('button')!;
    fireEvent.click(submissionsTab);
    expect(useAdminStore.getState().activeTab).toBe('submissions');
  });

  it('shows new leads badge when newLeadCount > 0', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not show new leads badge when newLeadCount is 0', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={0} />);
    // No badge number should render for unread count of 0
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('renders all 12 navigation tabs', () => {
    render(<AdminNav counts={defaultCounts} newLeadCount={0} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(12);
  });
});
