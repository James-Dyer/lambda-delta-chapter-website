/* eslint-disable react/prop-types */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { usePrevious } from '../usePrevious';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;
let latestPrevious;

function Harness({ value }) {
  latestPrevious = usePrevious(value);
  return null;
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  latestPrevious = undefined;
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  document.body.removeChild(container);
  container = null;
  root = null;
});

test('returns undefined on first render', () => {
  act(() => {
    root.render(<Harness value={42} />);
  });
  expect(latestPrevious).toBeUndefined();
});

test('returns undefined even when initial value is falsy (0)', () => {
  act(() => {
    root.render(<Harness value={0} />);
  });
  expect(latestPrevious).toBeUndefined();
});

test('returns previous value on second render', () => {
  act(() => {
    root.render(<Harness value={42} />);
  });
  act(() => {
    root.render(<Harness value={99} />);
  });
  expect(latestPrevious).toBe(42);
});

test('returns second-to-last value on third render', () => {
  act(() => {
    root.render(<Harness value={1} />);
  });
  act(() => {
    root.render(<Harness value={2} />);
  });
  act(() => {
    root.render(<Harness value={3} />);
  });
  expect(latestPrevious).toBe(2);
});

test('works with strings', () => {
  act(() => {
    root.render(<Harness value="hello" />);
  });
  act(() => {
    root.render(<Harness value="world" />);
  });
  expect(latestPrevious).toBe('hello');
});

test('works with null', () => {
  act(() => {
    root.render(<Harness value={null} />);
  });
  act(() => {
    root.render(<Harness value="next" />);
  });
  expect(latestPrevious).toBeNull();
});

test('works with object references', () => {
  const obj1 = { a: 1 };
  const obj2 = { a: 2 };
  act(() => {
    root.render(<Harness value={obj1} />);
  });
  act(() => {
    root.render(<Harness value={obj2} />);
  });
  expect(latestPrevious).toBe(obj1);
});

test('tracks correctly across many renders', () => {
  for (let i = 1; i <= 5; i++) {
    act(() => {
      root.render(<Harness value={i} />);
    });
  }
  // After 5 renders with values 1..5, previous should be 4
  expect(latestPrevious).toBe(4);
});
