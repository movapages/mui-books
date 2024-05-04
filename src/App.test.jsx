import React from 'react';
import { renderWrapper, screen } from './utils/testingUtils';
import App from './App';

describe('App component', () => {
  it('render "Welcome to the Migration Tooling Admin UI project!" header', () => {
    renderWrapper(<App />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });
});
