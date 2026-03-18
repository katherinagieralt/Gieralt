import { useQuery, useMutation } from '@tanstack/react-query';
import i18n from '../i18n';

const PAYLOAD_API_URL = 'http://localhost:3000/api';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects', i18n.language],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/projects?locale=${i18n.language}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials', i18n.language],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/testimonials?locale=${i18n.language}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};

export const usePlans = () => {
  return useQuery({
    queryKey: ['plans', i18n.language],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/plans?locale=${i18n.language}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};

export const useAbout = () => {
  return useQuery({
    queryKey: ['about', i18n.language],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/globals/about?locale=${i18n.language}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    },
  });
};

export const useOffers = () => {
  return useQuery({
    queryKey: ['offers', i18n.language],
    queryFn: async () => {
      const response = await fetch(`${PAYLOAD_API_URL}/offers?locale=${i18n.language}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.docs;
    },
  });
};

export const useSubmitInquiry = () => {
  return useMutation({
    mutationFn: async (inquiryData: { name: string; email: string; subject: string; message: string; source?: string }) => {
      const response = await fetch(`${PAYLOAD_API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });
      if (!response.ok) throw new Error('Failed to submit inquiry');
      return await response.json();
    },
  });
};

