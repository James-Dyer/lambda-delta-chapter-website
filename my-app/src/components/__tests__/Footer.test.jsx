import React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import Footer from '../Footer';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('displays current year', () => {
  act(() => {
    createRoot(container).render(<Footer />);
  });
  const year = new Date().getFullYear().toString();
  expect(container.textContent).toContain(year);
});
