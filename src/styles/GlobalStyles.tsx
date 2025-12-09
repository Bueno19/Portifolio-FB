import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* 1. Faz o site deslizar suavemente sozinho */
    scroll-behavior: smooth; 
    
    /* 2. O PULO DO GATO: Garante que o título não fique escondido atrás do Header */
    scroll-padding-top: 100px; 
  }

  body {
    background-color: #0f172a;
    color: #e2e8f0;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  /* Sua barra de rolagem personalizada continua aqui... */
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; border: 2px solid #0f172a; }
`;