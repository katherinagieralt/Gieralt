import { describe, it, expect, beforeEach, vi } from 'vitest';

// Health score calculation logic extracted for unit testing
// These mirror the logic inside ProjectHealthScore.tsx

interface ProjectLike {
  id: string;
  name: string;
  clientEmail: string;
  progress: number;
  estimatedCompletion: string;
  currentPhase: string;
  status: string;
}

type HealthStatus = 'on-track' | 'at-risk' | 'delayed';

function calculateHealth(project: ProjectLike): { status: HealthStatus; reason: string; score: number } {
  const today = new Date('2026-03-16'); // Fixed date for deterministic tests
  const completion = project.estimatedCompletion ? new Date(project.estimatedCompletion) : null;
  const daysLeft = completion ? Math.round((completion.getTime() - today.getTime()) / 86400000) : null;
  const progress = project.progress ?? 0;

  if (daysLeft !== null && daysLeft < 0 && progress < 100) {
    return {
      status: 'delayed',
      reason: `Termin minął ${Math.abs(daysLeft)} dni temu (postęp: ${progress}%)`,
      score: 0,
    };
  }
  if (
    (daysLeft !== null && daysLeft <= 7 && progress < 70) ||
    (daysLeft !== null && daysLeft <= 5 && progress < 90)
  ) {
    return {
      status: 'at-risk',
      reason: `${daysLeft} dni do terminu, postęp: ${progress}%`,
      score: 40,
    };
  }
  return {
    status: 'on-track',
    reason: `${daysLeft !== null ? `${daysLeft} dni do terminu` : 'Brak terminu'}, postęp: ${progress}%`,
    score: 100,
  };
}

const baseProject: ProjectLike = {
  id: '1',
  name: 'Test Project',
  clientEmail: 'test@example.com',
  progress: 50,
  estimatedCompletion: '2026-04-01',
  currentPhase: 'Design',
  status: 'in-progress',
};

describe('ProjectHealthScore - calculateHealth logic', () => {
  it('returns on-track when deadline is far away and good progress', () => {
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '2026-05-01', progress: 50 });
    expect(result.status).toBe('on-track');
    expect(result.score).toBe(100);
  });

  it('returns delayed when past deadline with incomplete progress', () => {
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '2026-01-01', progress: 80 });
    expect(result.status).toBe('delayed');
    expect(result.score).toBe(0);
  });

  it('returns delayed when past deadline with 0 progress', () => {
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '2026-02-01', progress: 0 });
    expect(result.status).toBe('delayed');
  });

  it('returns on-track when progress is 100% even if past deadline', () => {
    // 100% progress: NOT delayed
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '2026-01-01', progress: 100 });
    expect(result.status).toBe('on-track');
  });

  it('returns at-risk when 5 days left and progress is below 90%', () => {
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '2026-03-20', progress: 60 });
    expect(result.status).toBe('at-risk');
    expect(result.score).toBe(40);
  });

  it('returns at-risk when 7 days left and progress below 70%', () => {
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '2026-03-23', progress: 50 });
    expect(result.status).toBe('at-risk');
  });

  it('returns on-track when 7 days left but progress is 70% or more', () => {
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '2026-03-23', progress: 70 });
    expect(result.status).toBe('on-track');
  });

  it('returns on-track when estimatedCompletion is empty', () => {
    const result = calculateHealth({ ...baseProject, estimatedCompletion: '' });
    expect(result.status).toBe('on-track');
    expect(result.reason).toContain('Brak terminu');
  });
});
