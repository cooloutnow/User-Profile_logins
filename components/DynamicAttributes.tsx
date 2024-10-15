'use client';

import { useEffect } from 'react';

export function DynamicAttributes() {
  useEffect(() => {
    document.body.setAttribute('data-new-gr-c-s-check-loaded', '14.1200.0');
    document.body.setAttribute('data-gr-ext-installed', '');
  }, []);

  return null;
}