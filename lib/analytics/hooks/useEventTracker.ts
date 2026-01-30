// General purpose event tracking hook

'use client';

import { useCallback } from 'react';
import { sendGtagEvent } from '../gtag';
import type { BaseEvent } from '../types';

/**
 * General purpose event tracking hook
 *
 * @returns Object with track function
 *
 * @example
 * const { track } = useEventTracker();
 * track('custom_event', { key: 'value' });
 */
export function useEventTracker() {
  const track = useCallback((eventName: string, eventParams?: BaseEvent) => {
    sendGtagEvent(eventName, eventParams);
  }, []);

  return { track };
}
