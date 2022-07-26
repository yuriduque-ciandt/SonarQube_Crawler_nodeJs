import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    black: '#262626',
    text: '#444',
    background: '#f3f3f3'
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em'
  }
};

const Theme = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
export const themeSchema = theme;
