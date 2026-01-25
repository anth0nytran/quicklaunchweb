// =============================================================================
// Query State Helpers
// URL persistence with debouncing for shareable demo links
// =============================================================================

import { useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { DemoState, TemplateId, CTAOption } from './demoTypes';
import { CTA_OPTIONS } from './demoTypes';
import { TEMPLATES, getDefaultState } from './demoTemplates';

const DEBOUNCE_MS = 400;

// -----------------------------------------------------------------------------
// Serialization Helpers
// -----------------------------------------------------------------------------

export function encodeServices(services: string[]): string {
  return services.join('|');
}

export function decodeServices(encoded: string): string[] {
  if (!encoded) return [];
  return encoded.split('|').filter(Boolean);
}

export function stateToParams(state: DemoState): URLSearchParams {
  const params = new URLSearchParams();

  params.set('template', state.template);
  params.set('name', state.businessName);
  params.set('city', state.city);
  params.set('phone', state.phone);
  params.set('cta', state.cta);
  params.set('theme', state.theme);
  params.set('img', state.heroImage);
  params.set('services', encodeServices(state.services));

  return params;
}

export function paramsToState(searchParams: URLSearchParams): DemoState {
  const templateParam = searchParams.get('template') as TemplateId | null;
  const templateId: TemplateId =
    templateParam && templateParam in TEMPLATES ? templateParam : 'roofing';

  const defaults = getDefaultState(templateId);
  const template = TEMPLATES[templateId];

  // Validate CTA
  const ctaParam = searchParams.get('cta') as CTAOption | null;
  const validCta = ctaParam && CTA_OPTIONS.includes(ctaParam) ? ctaParam : defaults.cta;

  // Validate theme
  const themeParam = searchParams.get('theme');
  const validTheme = themeParam && template.themes.some(t => t.id === themeParam)
    ? themeParam
    : defaults.theme;

  // Validate hero image
  const imgParam = searchParams.get('img');
  const validImg = imgParam && template.heroImages.some(h => h.id === imgParam)
    ? imgParam
    : defaults.heroImage;

  return {
    template: templateId,
    businessName: searchParams.get('name') || defaults.businessName,
    city: searchParams.get('city') || defaults.city,
    phone: searchParams.get('phone') || defaults.phone,
    cta: validCta,
    services: searchParams.get('services')
      ? decodeServices(searchParams.get('services')!)
      : defaults.services,
    theme: validTheme,
    heroImage: validImg,
  };
}

// -----------------------------------------------------------------------------
// React Hook for URL State Sync
// -----------------------------------------------------------------------------

export function useDemoQueryState(
  state: DemoState,
  setState: React.Dispatch<React.SetStateAction<DemoState>>
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  // Initialize state from URL on mount
  useEffect(() => {
    if (!initializedRef.current) {
      const urlState = paramsToState(searchParams);
      setState(urlState);
      initializedRef.current = true;
    }
  }, [searchParams, setState]);

  // Debounced URL update
  const updateUrl = useCallback((newState: DemoState) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = stateToParams(newState);
      const newUrl = `/demo?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }, DEBOUNCE_MS);
  }, [router]);

  // Sync state changes to URL
  useEffect(() => {
    if (initializedRef.current) {
      updateUrl(state);
    }
  }, [state, updateUrl]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}

// -----------------------------------------------------------------------------
// Utility: Generate shareable URL
// -----------------------------------------------------------------------------

export function generateShareUrl(state: DemoState): string {
  const params = stateToParams(state);
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://quicklaunchweb.us';
  return `${baseUrl}/demo?${params.toString()}`;
}
