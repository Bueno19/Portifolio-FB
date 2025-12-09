import React from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';

// Importe os SEUS componentes atuais.
// Se eles estiverem em pastas diferentes, ajuste o caminho.
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

// Se você não tiver o componente ScrollReveal, pode remover a importação e o uso dele abaixo.
import { ScrollReveal } from './components/ScrollReveal'; 

const MainContent = styled.main`
    padding-top: 80px; /* Compensa o Header fixo */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0f172a; /* Cor de fundo principal */
    overflow-x: hidden;
`;

// Wrapper crucial para a navegação funcionar
const SectionWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const App: React.FC = () => {
  return (
    <>
      <Header />
      
      <MainContent>
          
          {/* ID HOME -> Conecta com o logo e botão Home */}
          <SectionWrapper id="home">
            <Hero />
          </SectionWrapper>
          
          {/* ID SKILLS -> Conecta com o botão Skills */}
          {/* Se não tiver ScrollReveal, remova a tag <ScrollReveal> e mantenha o SectionWrapper */}
          <ScrollReveal>
            <SectionWrapper id="skills">
                <Skills />
            </SectionWrapper>
          </ScrollReveal>
          
          {/* ID PROJECTS -> Conecta com o botão Projects */}
          <ScrollReveal>
            <SectionWrapper id="projects">
                <Projects />
            </SectionWrapper>
          </ScrollReveal>
          
          {/* ID CONTACT -> Conecta com o botão Contact */}
          <ScrollReveal>
            <SectionWrapper id="contact">
                <Contact />
            </SectionWrapper>
          </ScrollReveal>

      </MainContent>

      <Footer>
        <p>Desenvolvido com React & Styled Components</p>
        <small>© {new Date().getFullYear()} Felipe Bueno.</small>
      </Footer>
    </>
  );
};

const Footer = styled.footer`
    background-color: #020617;
    padding: 40px 20px;
    text-align: center;
    border-top: 1px solid #1e293b;
    color: #64748b;
    width: 100%;
    p { margin-bottom: 10px; }
    small { opacity: 0.6; }
`;

export default App;