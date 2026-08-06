import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import ArchiveBanner from '../ArchiveBanner';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

test('identifies the site as an independent May 2026 archive', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => root.render(<ArchiveBanner />));

  expect(container.textContent).toContain('Archived website');
  expect(container.textContent).toContain('May 2026 snapshot');
  expect(container.textContent).toContain('not the chapter');

  act(() => root.unmount());
});
