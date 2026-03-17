export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  image: string;
  highlight: string;
}
