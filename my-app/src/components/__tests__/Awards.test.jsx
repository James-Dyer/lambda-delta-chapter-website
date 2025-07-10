import React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import Awards from '../Home/Awards';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('shows more awards after clicking toggle', () => {
  act(() => {
    createRoot(container).render(<Awards />);
  });
  const toggle = container.querySelector('.timeline-toggle');
  const items = () => container.querySelectorAll('.timeline-item');
  const initialCount = items().length;
  expect(initialCount).toBeLessThanOrEqual(5);
  act(() => {
    toggle.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(items().length).toBeGreaterThan(initialCount);
  expect(toggle.textContent).toMatch(/show less/i);
});
