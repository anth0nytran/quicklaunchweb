// =============================================================================
// Template Configurations
// Data-driven configs for each niche template
// =============================================================================

import type { TemplateConfig, TemplateId } from './demoTypes';

// -----------------------------------------------------------------------------
// Roofing Template - "Strong + Trust"
// Darker, high contrast, bolder type, confident layout
// -----------------------------------------------------------------------------

const roofingTemplate: TemplateConfig = {
  id: 'roofing',
  name: 'Home Essentials',
  description: 'Roofing · HVAC · Plumbing',
  defaultData: {
    businessName: 'Summit Home Essentials',
    city: 'Plano, TX',
    phone: '(469) 555-0182',
    cta: 'Get Free Estimate',
    services: ['Roofing', 'HVAC Tune-Ups', 'Plumbing Repairs', 'Water Heaters'],
    theme: 'slate',
    heroImage: 'roof-1',
  },
  themes: [
    {
      id: 'slate',
      name: 'Slate',
      primary: '#1e293b',
      primaryHover: '#334155',
      accent: '#f97316',
      bg: '#0f172a',
      text: '#f8fafc',
      muted: '#94a3b8',
      card: '#1e293b',
      cardBorder: '#334155',
    },
    {
      id: 'charcoal',
      name: 'Charcoal',
      primary: '#18181b',
      primaryHover: '#27272a',
      accent: '#22c55e',
      bg: '#09090b',
      text: '#fafafa',
      muted: '#a1a1aa',
      card: '#18181b',
      cardBorder: '#27272a',
    },
    {
      id: 'navy',
      name: 'Navy',
      primary: '#1e3a5f',
      primaryHover: '#2d4a6f',
      accent: '#fbbf24',
      bg: '#0c1929',
      text: '#f0f9ff',
      muted: '#7dd3fc',
      card: '#1e3a5f',
      cardBorder: '#2d4a6f',
    },
    {
      id: 'storm',
      name: 'Storm',
      primary: '#292524',
      primaryHover: '#44403c',
      accent: '#ef4444',
      bg: '#1c1917',
      text: '#fafaf9',
      muted: '#a8a29e',
      card: '#292524',
      cardBorder: '#44403c',
    },
  ],
  heroImages: [
    {
      id: 'roof-1',
      src: 'https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?auto=format&fit=crop&w=1600&q=80',
      alt: 'Roofer working on a residential roof',
      label: 'Roofing',
    },
    {
      id: 'roof-2',
      src: 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?auto=format&fit=crop&w=1600&q=80',
      alt: 'Plumber repairing bathroom piping',
      label: 'Plumbing',
    },
    {
      id: 'roof-3',
      src: 'https://images.unsplash.com/photo-1766788466565-768128d89ce4?auto=format&fit=crop&w=1600&q=80',
      alt: 'Air conditioning unit mounted on a wall',
      label: 'HVAC',
    },
    {
      id: 'roof-4',
      src: 'https://images.unsplash.com/photo-1673645652590-9d21295bf4ac?auto=format&fit=crop&w=1600&q=80',
      alt: 'Architectural shingle roof detail',
      label: 'Roof Detail',
    },
  ],
  projectTypes: ['Roofing', 'HVAC', 'Plumbing', 'Water Heaters', 'Emergency Leak', 'Maintenance'],
};

// -----------------------------------------------------------------------------
// Pool Template - "Calm + Premium"
// Airy palette, lots of whitespace, softer rounded corners, calm motion
// -----------------------------------------------------------------------------

const poolTemplate: TemplateConfig = {
  id: 'pool',
  name: 'Outdoor Living',
  description: 'Pools · Patios · Outdoor Kitchens',
  defaultData: {
    businessName: 'Verde Outdoor Living',
    city: 'Scottsdale, AZ',
    phone: '(480) 555-0176',
    cta: 'Request a Quote',
    services: ['Pool Care', 'Outdoor Kitchens', 'Hardscapes', 'Lighting + Fire'],
    theme: 'aqua',
    heroImage: 'pool-1',
  },
  themes: [
    {
      id: 'aqua',
      name: 'Aqua',
      primary: '#0891b2',
      primaryHover: '#0e7490',
      accent: '#06b6d4',
      bg: '#f0fdfa',
      text: '#134e4a',
      muted: '#5eead4',
      card: '#ffffff',
      cardBorder: '#99f6e4',
    },
    {
      id: 'ocean',
      name: 'Ocean',
      primary: '#0369a1',
      primaryHover: '#075985',
      accent: '#38bdf8',
      bg: '#f0f9ff',
      text: '#0c4a6e',
      muted: '#7dd3fc',
      card: '#ffffff',
      cardBorder: '#bae6fd',
    },
    {
      id: 'lagoon',
      name: 'Lagoon',
      primary: '#0d9488',
      primaryHover: '#0f766e',
      accent: '#2dd4bf',
      bg: '#f0fdfa',
      text: '#115e59',
      muted: '#5eead4',
      card: '#ffffff',
      cardBorder: '#99f6e4',
    },
    {
      id: 'sunset',
      name: 'Sunset',
      primary: '#ea580c',
      primaryHover: '#c2410c',
      accent: '#fb923c',
      bg: '#fffbeb',
      text: '#78350f',
      muted: '#fcd34d',
      card: '#ffffff',
      cardBorder: '#fde68a',
    },
  ],
  heroImages: [
    {
      id: 'pool-1',
      src: 'https://images.unsplash.com/photo-1706164971299-cfa23ec76083?auto=format&fit=crop&w=1600&q=80',
      alt: 'Modern home with a backyard pool',
      label: 'Pool Retreat',
    },
    {
      id: 'pool-2',
      src: 'https://images.unsplash.com/photo-1635108201275-f2858f087bd9?auto=format&fit=crop&w=1600&q=80',
      alt: 'Patio seating beside a pool',
      label: 'Outdoor Lounge',
    },
    {
      id: 'pool-3',
      src: 'https://images.unsplash.com/photo-1644232139100-c0320ff0c2fe?auto=format&fit=crop&w=1600&q=80',
      alt: 'Outdoor kitchen with bar seating',
      label: 'Outdoor Kitchen',
    },
    {
      id: 'pool-4',
      src: 'https://images.unsplash.com/photo-1634923295030-730da9900a2d?auto=format&fit=crop&w=1600&q=80',
      alt: 'Backyard pool with pergola patio',
      label: 'Backyard Escape',
    },
  ],
  projectTypes: ['Pool Maintenance', 'Outdoor Kitchen', 'Patio + Pergola', 'Lighting', 'New Build', 'Other'],
};

// -----------------------------------------------------------------------------
// Remodeling Template - "Craft + Luxury"
// Neutral/warm, editorial typography, premium materials vibe
// -----------------------------------------------------------------------------

const remodelingTemplate: TemplateConfig = {
  id: 'remodeling',
  name: 'Design + Build',
  description: 'Remodels · Additions · Custom Builds',
  defaultData: {
    businessName: 'Stonebridge Design+Build',
    city: 'Frisco, TX',
    phone: '(281) 555-0123',
    cta: 'Book a Consultation',
    services: ['Full Home Remodels', 'Additions', 'Custom Builds', 'Kitchen + Bath'],
    theme: 'warm',
    heroImage: 'remodel-1',
  },
  themes: [
    {
      id: 'warm',
      name: 'Warm Oak',
      primary: '#78716c',
      primaryHover: '#57534e',
      accent: '#b45309',
      bg: '#fafaf9',
      text: '#292524',
      muted: '#a8a29e',
      card: '#ffffff',
      cardBorder: '#e7e5e4',
    },
    {
      id: 'marble',
      name: 'Marble',
      primary: '#4b5563',
      primaryHover: '#374151',
      accent: '#0f172a',
      bg: '#f9fafb',
      text: '#111827',
      muted: '#9ca3af',
      card: '#ffffff',
      cardBorder: '#e5e7eb',
    },
    {
      id: 'sage',
      name: 'Sage',
      primary: '#4d7c0f',
      primaryHover: '#3f6212',
      accent: '#65a30d',
      bg: '#fefce8',
      text: '#365314',
      muted: '#a3e635',
      card: '#ffffff',
      cardBorder: '#d9f99d',
    },
    {
      id: 'mocha',
      name: 'Mocha',
      primary: '#6b4f4f',
      primaryHover: '#5a4040',
      accent: '#92400e',
      bg: '#fef3c7',
      text: '#451a03',
      muted: '#d97706',
      card: '#ffffff',
      cardBorder: '#fde68a',
    },
  ],
  heroImages: [
    {
      id: 'remodel-1',
      src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80',
      alt: 'Warm modern living space',
      label: 'Living Space',
    },
    {
      id: 'remodel-2',
      src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80',
      alt: 'Bright, modern kitchen interior',
      label: 'Kitchen Studio',
    },
    {
      id: 'remodel-3',
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      alt: 'Modern custom home exterior',
      label: 'Custom Build',
    },
    {
      id: 'remodel-4',
      src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
      alt: 'Minimalist dining space',
      label: 'Signature Finish',
    },
  ],
  projectTypes: ['Remodel', 'Addition', 'Custom Build', 'Kitchen', 'Bath', 'Other'],
};

// -----------------------------------------------------------------------------
// Template Registry
// -----------------------------------------------------------------------------

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  roofing: roofingTemplate,
  pool: poolTemplate,
  remodeling: remodelingTemplate,
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);

export function getTemplate(id: TemplateId): TemplateConfig {
  return TEMPLATES[id];
}

export function getDefaultState(templateId: TemplateId) {
  const template = getTemplate(templateId);
  return {
    template: templateId,
    ...template.defaultData,
  };
}
