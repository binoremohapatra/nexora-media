export type VideoType = 'youtube' | 'instagram';

export interface Project {
  id: string;
  title: string;
  category: string;
  type: VideoType;
  embedUrl: string;
  permalink: string;
}

export type ServiceGroup = 'Video' | 'Design' | 'Brand' | 'Growth';

export interface Service {
  id: string;
  number: string;
  name: string;
  description: string;
  group: ServiceGroup;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type Theme = 'light' | 'dark';
