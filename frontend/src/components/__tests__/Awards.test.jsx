import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Awards from '../Home/Awards';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  document.body.removeChild(container);
  container = null;
  root = null;
});

test('shows more awards after clicking toggle', () => {
  act(() => {
    root.render(<Awards />);
  });
  const toggle = container.querySelector('.timeline-toggle');
  const items = () => container.querySelectorAll('.timeline-item');
  const initialCount = items().length;
  expect(initialCount).toBeLessThanOrEqual(5);
  act(() => {
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items().length).toBeGreaterThan(initialCount);
  expect(toggle.textContent).toMatch(/show less/i);
});
