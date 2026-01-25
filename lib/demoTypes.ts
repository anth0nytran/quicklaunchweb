// =============================================================================
// Demo Template Types
// =============================================================================

export type TemplateId = 'roofing' | 'pool' | 'remodeling';

export type CTAOption =
  | 'Get Free Estimate'
  | 'Request a Quote'
  | 'Schedule Inspection'
  | 'Book a Consultation';

export const CTA_OPTIONS: CTAOption[] = [
  'Get Free Estimate',
  'Request a Quote',
  'Schedule Inspection',
  'Book a Consultation',
];

export interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  accent: string;
  bg: string;
  text: string;
  muted: string;
  card: string;
  cardBorder: string;
}

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  defaultData: DemoData;
  themes: ThemePreset[];
  heroImages: HeroImage[];
  projectTypes: string[];
}

export interface DemoData {
  businessName: string;
  city: string;
  phone: string;
  cta: CTAOption;
  services: string[];
  theme: string;
  heroImage: string;
}

export interface DemoState extends DemoData {
  template: TemplateId;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

// Preview mode for responsive toggle
export type PreviewMode = 'desktop' | 'mobile';
