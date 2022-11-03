import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme();
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
);
