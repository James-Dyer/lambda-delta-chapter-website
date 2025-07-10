import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Footer from '../Footer';

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

test('displays current year', () => {
  act(() => {
    root.render(<Footer />);
  });
  const year = new Date().getFullYear().toString();
  expect(container.textContent).toContain(year);
});
