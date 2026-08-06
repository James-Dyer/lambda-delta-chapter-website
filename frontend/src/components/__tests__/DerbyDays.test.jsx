/* eslint-disable react/prop-types */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { vi } from 'vitest';
import DerbyDays from '../DerbyDays';
import {
  derbyDaysProfessional,
  derbyDaysSocial,
} from '../../Data/archiveSnapshot';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock('framer-motion', () => {
  const React = require('react');
  const MotionDiv = ({ children, className }) => (
    <div className={className}>{children}</div>
  );
  return {
    motion: { div: MotionDiv },
    AnimatePresence: ({ children }) => <>{children}</>,
    LayoutGroup: ({ children }) => <>{children}</>,
  };
});

test('renders both populated archived leaderboards and the local schedule image', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => root.render(<DerbyDays />));

  expect(container.textContent).toContain('Snapshot: May 2026');
  expect(container.textContent).toContain('Social Organizations');
  expect(container.textContent).toContain('Professional Organizations');
  expect(container.querySelectorAll('.leaderboard-row')).toHaveLength(
    derbyDaysSocial.length + derbyDaysProfessional.length
  );
  const scheduleImage = container.querySelector('.canva-embed-container img');
  expect(scheduleImage).not.toBeNull();
  expect(container.querySelector('iframe')).toBeNull();

  act(() => root.unmount());
  document.body.removeChild(container);
});
