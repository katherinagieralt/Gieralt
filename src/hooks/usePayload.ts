import { useQuery } from '@tanstack/react-query';

const PAYLOAD_API_URL = 'http://localhost:3000/api';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/projects`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/testimonials`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};

export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/plans`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/globals/about`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    },
  });
};

export const useOffers = () => {
  return useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/offers`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};
