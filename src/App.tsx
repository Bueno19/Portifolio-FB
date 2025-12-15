import React, { useState } from 'react';
import styled from 'styled-components';

// --- 1. IMPORTAÇÃO DOS COMPONENTES ---

// Estrutura e Utilitários
import { Header } from './components/Header';
import { ScrollReveal } from './components/ScrollReveal';

// Seções da Página Principal (Landing Page)
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Playground } from './sections/Playground'; 
import { Contact } from './sections/Contact';

// Aplicações do Laboratório (Apps Interativos)
import { MarketMonitor } from './lab/MarketMonitor';
import GamerSection from './lab/GamerSection';
import { AIChatBot } from './lab/AIChatBot';
import { CreativeShowcase } from './lab/CreativeShowcase'; // Tela nova "React Bits"

const App: React.FC = () => {
  // Estado que define qual "tela" o usuário está vendo agora
  // Adicionamos 'creative' para a nova seção
  const [currentView, setCurrentView] = useState<'home' | 'market' | 'gamer' | 'chatbot' | 'creative'>('home');

  // Função auxiliar para trocar de tela e garantir scroll no topo
  const handleViewChange = (view: 'home' | 'market' | 'gamer' | 'chatbot' | 'creative') => {
    setCurrentView(view);
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* O Header recebe o estado atual e a função de troca */}
      <Header 
        currentView={currentView} 
        onChangeView={(view) => handleViewChange(view as any)} 
      />
      
      <MainContent>
          
          {/* --- CENÁRIO 1: TELA INICIAL (HOME) --- */}
          {currentView === 'home' && (
            <>
              {/* Hero Section */}
              <SectionWrapper id="home">
                <Hero />
              </SectionWrapper>
              
              {/* Skills com animação de scroll */}
              <ScrollReveal>
                <SectionWrapper id="skills">
                    <Skills />
                </SectionWrapper>
              </ScrollReveal>
              
              {/* Projetos */}
              <ScrollReveal>
                <SectionWrapper id="projects">
                    <Projects />
                </SectionWrapper>
              </ScrollReveal>

              {/* VITRINE (PLAYGROUND) */}
              <ScrollReveal>
                <SectionWrapper id="lab">
                    <Playground onChangeView={handleViewChange} />
                </SectionWrapper>
              </ScrollReveal>
              
              {/* Contato */}
              <ScrollReveal>
                <SectionWrapper id="contact">
                    <Contact />
                </SectionWrapper>
              </ScrollReveal>

              <Footer>
                <p>Desenvolvido com React, TypeScript & Styled Components</p>
                <small>© {new Date().getFullYear()} Felipe Bueno. Todos os direitos reservados.</small>
              </Footer>
            </>
          )}

          {/* --- CENÁRIO 2: MONITOR DE MERCADO --- */}
          {currentView === 'market' && (
            <MarketMonitor onClose={() => handleViewChange('home')} />
          )}

          {/* --- CENÁRIO 3: ÁREA GAMER --- */}
          {currentView === 'gamer' && (
            <GamerSectionWrapper>
               <GamerSection />
               
               {/* Botão Flutuante para Sair da Área Gamer */}
               <FloatingBackButton onClick={() => handleViewChange('home')}>
                 ✕ SAIR DA ZONE
               </FloatingBackButton>
            </GamerSectionWrapper>
          )}

          {/* --- CENÁRIO 4: AI CHATBOT --- */}
          {currentView === 'chatbot' && (
            <AIChatBot onClose={() => handleViewChange('home')} />
          )}

          {/* --- CENÁRIO 5: CREATIVE SHOWCASE (NOVO) --- */}
          {currentView === 'creative' && (
            <CreativeShowcase onClose={() => handleViewChange('home')} />
          )}

      </MainContent>
    </>
  );
};

// --- ESTILOS GERAIS (Styled Components) ---

const MainContent = styled.main`
    /* Compensa a altura do Header fixo (80px) */
    padding-top: 80px; 
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0f172a; /* Cor de fundo principal (Slate Dark) */
    overflow-x: hidden;
`;

const SectionWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

// Wrapper para animação de entrada da tela Gamer
const GamerSectionWrapper = styled.div`
    width: 100%;
    animation: fadeIn 0.5s ease;
    position: relative;
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// Botão Flutuante para Sair (usado na Gamer Zone)
const FloatingBackButton = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: rgba(239, 68, 68, 0.8); /* Vermelho translúcido */
    color: white;
    border: 1px solid #ef4444;
    padding: 10px 20px;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1000;
    backdrop-filter: blur(5px);
    transition: all 0.3s;
    font-family: 'Fira Code', monospace;
    font-size: 0.8rem;

    &:hover {
        background: #ef4444;
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
    }
`;

const Footer = styled.footer`
    background-color: #020617;
    padding: 40px 20px;
    text-align: center;
    border-top: 1px solid #1e293b;
    color: #64748b;
    width: 100%;
    font-family: 'Fira Code', monospace;
    
    p { margin-bottom: 10px; font-size: 0.9rem; }
    small { opacity: 0.6; font-size: 0.8rem; }
`;

export default App;