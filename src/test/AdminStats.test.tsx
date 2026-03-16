import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdminStats } from '../components/admin/AdminStats';

const defaultProps = {
  submissionsCount: 12,
  signupsCount: 45,
  blogCount: 8,
  portfolioCount: 15,
  testimonialsCount: 6,
  activeProjectsCount: 3,
};

describe('AdminStats', () => {
  it('renders all 6 stat cards', () => {
    render(<AdminStats {...defaultProps} />);
    expect(screen.getByText('Zgłoszenia')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Artykuły')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Opinie')).toBeInTheDocument();
    expect(screen.getByText('Aktywne projekty')).toBeInTheDocument();
  });

  it('displays correct submission count', () => {
    render(<AdminStats {...defaultProps} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('displays correct signups count', () => {
    render(<AdminStats {...defaultProps} />);
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('displays correct active projects count', () => {
    render(<AdminStats {...defaultProps} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders 0 when all counts are 0', () => {
    const zeroProps = {
      submissionsCount: 0,
      signupsCount: 0,
      blogCount: 0,
      portfolioCount: 0,
      testimonialsCount: 0,
      activeProjectsCount: 0,
    };
    const { getAllByText } = render(<AdminStats {...zeroProps} />);
    // 6 zeros, one per stat card
    expect(getAllByText('0')).toHaveLength(6);
  });
});
