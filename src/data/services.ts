import type { Service } from '../types';

export const services: Service[] = [
  // Video
  {
    id: 'video-editing',
    number: '03',
    name: 'Video Editing',
    description: 'Short-form reels, launch videos, brand edits and polished social-first storytelling.',
    group: 'Video',
  },
  {
    id: 'videography',
    number: '12',
    name: 'Videography',
    description: 'Premium video concepts, shot planning and production support for digital-first campaigns.',
    group: 'Video',
  },
  {
    id: 'content-creation',
    number: '02',
    name: 'Content Creation',
    description: 'Premium content concepts, scripts, visuals and platform-ready creative assets.',
    group: 'Video',
  },
  // Design
  {
    id: 'graphic-design',
    number: '04',
    name: 'Graphic Design',
    description: 'Modern creatives for campaigns, posts, ads, brochures, banners and brand moments.',
    group: 'Design',
  },
  {
    id: 'logo-design',
    number: '06',
    name: 'Logo Design',
    description: 'Clean, premium logos with flexible lockups for web, social media and print use.',
    group: 'Design',
  },
  {
    id: 'photography',
    number: '11',
    name: 'Photography',
    description: 'Professional brand, product, team and lifestyle photography planning and direction.',
    group: 'Design',
  },
  // Brand
  {
    id: 'branding-identity',
    number: '05',
    name: 'Branding & Identity',
    description: 'Positioning, tone, visual systems and memorable identity assets for your brand.',
    group: 'Brand',
  },
  {
    id: 'website-design',
    number: '07',
    name: 'Website Design & Development',
    description: 'Fast, responsive, conversion-focused websites with modern UI and clean code.',
    group: 'Brand',
  },
  {
    id: 'social-media-management',
    number: '01',
    name: 'Social Media Management',
    description: 'Strategic content calendars, captions, publishing support and performance-led community growth.',
    group: 'Brand',
  },
  // Growth
  {
    id: 'meta-ads',
    number: '08',
    name: 'Meta Ads',
    description: 'Campaign strategy, creative testing and optimization for Instagram and Facebook growth.',
    group: 'Growth',
  },
  {
    id: 'google-ads',
    number: '09',
    name: 'Google Ads',
    description: 'Search-focused paid campaigns that help customers find your business at the right moment.',
    group: 'Growth',
  },
  {
    id: 'seo',
    number: '10',
    name: 'SEO',
    description: 'Technical setup, content structure and search-friendly pages built for long-term visibility.',
    group: 'Growth',
  },
];

export const serviceGroups = ['Video', 'Design', 'Brand', 'Growth'] as const;
