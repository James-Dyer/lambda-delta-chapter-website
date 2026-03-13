import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { vi } from 'vitest';
import DonationButton from '../DonationButton';

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

test('renders anchor with icon when href provided', () => {
  act(() => {
    root.render(
      <DonationButton href="https://example.com">Give</DonationButton>
    );
  });
  const anchor = container.querySelector('a');
  expect(anchor).not.toBeNull();
  expect(anchor.getAttribute('href')).toBe('https://example.com');
  const img = anchor.querySelector('img');
  expect(img).not.toBeNull();
  expect(img.getAttribute('alt')).toMatch(/opens in new tab/i);
});

test('calls onClick when button is clicked', () => {
  const onClick = vi.fn();
  act(() => {
    root.render(<DonationButton onClick={onClick}>Press</DonationButton>);
  });
  const button = container.querySelector('button');
  expect(button).not.toBeNull();
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(onClick).toHaveBeenCalled();
});
