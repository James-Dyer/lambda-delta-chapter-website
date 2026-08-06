/* eslint-disable react/prop-types */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { vi } from 'vitest';
import CallathonLeaderboard from '../CallathonLeaderboard';
import { callathon } from '../../Data/archiveSnapshot';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock('framer-motion', () => {
  const React = require('react');
  const MotionDiv = ({ children, className, style }) => (
    <div className={className} style={style}>
      {children}
    </div>
  );
  const MotionSpan = ({ children, className }) => (
    <span className={className}>{children}</span>
  );
  return {
    motion: { div: MotionDiv, span: MotionSpan },
    AnimatePresence: ({ children }) => <>{children}</>,
    LayoutGroup: ({ children }) => <>{children}</>,
  };
});

test('renders the archived Day 1 call-o-thon values', () => {
  HTMLCanvasElement.prototype.getContext = () => ({
    measureText: (text) => ({ width: text.length * 10 }),
    font: '',
  });
  global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  global.cancelAnimationFrame = (id) => clearTimeout(id);

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => root.render(<CallathonLeaderboard />));

  expect(container.textContent).toContain('Snapshot: May 2026');
  expect(container.querySelectorAll('.bar-row')).toHaveLength(callathon.length);
  expect(container.textContent).toContain('Phi Mu');
  expect(container.textContent).toContain('$1,629.55');

  act(() => root.unmount());
  document.body.removeChild(container);
});
