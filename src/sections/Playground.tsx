import React from 'react';
import styled from 'styled-components';

// Atualizei a interface para aceitar 'creative' também, prevenindo erros de tipagem no App.tsx
interface PlaygroundProps {
    onChangeView?: (view: 'home' | 'market' | 'gamer' | 'chatbot' | 'creative') => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ onChangeView }) => {
  return (
    <Container>
      {/* Título Principal */}
      <Title>
        &lt; Laboratory <span className="highlight">/&gt;</span>
      </Title>

      {/* Subtítulo Criativo (Estilo Código) */}
      <CodeSnippet>
        <span className="comment">// Welcome to my experimental zone</span>
        <br />
        <span className="keyword">const</span> <span className="var">experiments</span> = [<span className="string">'Finance'</span>, <span className="string">'Gaming'</span>, <span className="string">'AI'</span>, <span className="string">'Creative UI'</span>];
      </CodeSnippet>

      <Grid>
        {/* --- CARD 1: MERCADO FINANCEIRO --- */}
        <Card onClick={() => onChangeView && onChangeView('market')}>
          <div className="icon">💰</div>
          <h3>Market Monitor</h3>
          <p>Dashboard financeiro com cotações de Ações (B3), Cripto e Moedas em tempo real.</p>
          <StatusBadge $active={true}>ONLINE</StatusBadge>
          <div className="hover-text">ABRIR DASHBOARD</div>
        </Card>

        {/* --- CARD 2: ÁREA GAMER --- */}
        <Card onClick={() => onChangeView && onChangeView('gamer')}>
          <div className="icon">🎮</div>
          <h3>Gamer Zone</h3>
          <p>Interface temática estilo Steam/Cyberpunk com biblioteca de jogos, setup e perfil interativo.</p>
          <StatusBadge $active={true}>LIVE v2.0</StatusBadge> 
          <div className="hover-text">ENTRAR NA ZONE</div>
        </Card>

        {/* --- CARD 3: AI ASSISTANT --- */}
        <Card onClick={() => onChangeView && onChangeView('chatbot')}>
          <div className="icon">🤖</div>
          <h3>AI Assistant</h3>
          <p>Chatbot inteligente simulado para responder dúvidas sobre o portfólio e tecnologias.</p>
          <StatusBadge $active={true}>ONLINE (DEMO)</StatusBadge>
          <div className="hover-text">INICIAR CONVERSA</div>
        </Card>

        {/* --- CARD 4: CREATIVE SHOWCASE (Novo!) --- */}
        <Card onClick={() => onChangeView && onChangeView('creative')} className="featured">
          <div className="icon">✨</div>
          <h3>Creative UI</h3>
          <p>Galeria de componentes visuais avançados (Holo Card, Magnetic Button).</p>
          <StatusBadge $active={true} style={{borderColor: '#d8b4fe', color: '#d8b4fe', background: 'rgba(216, 180, 254, 0.1)'}}>NEW</StatusBadge>
          <div className="hover-text" style={{color: '#d8b4fe'}}>EXPLORAR UI</div>
        </Card>

      </Grid>
    </Container>
  );
};

// --- ESTILOS ---

const Container = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #e2e8f0;
  margin-bottom: 20px;
  font-family: 'Fira Code', monospace;
  
  .highlight { color: #38bdf8; }
`;

// Novo Estilo para o Texto de Código
const CodeSnippet = styled.div`
  background: #0b0d14;
  border: 1px solid #1e293b;
  padding: 15px 25px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  margin-bottom: 60px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 1.6;

  /* Cores de Sintaxe (Tema Drácula/VSCode) */
  .comment { color: #6272a4; font-style: italic; }
  .keyword { color: #ff79c6; } /* Pink */
  .var { color: #f8f8f2; }     /* White */
  .string { color: #f1fa8c; }  /* Yellow */

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Ajustei minmax para caber melhor 4 itens */
  gap: 30px;
  width: 100%;
`;

const Card = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 260px; /* Altura mínima para uniformidade */

  /* Estilo para cartões bloqueados */
  &.locked {
    opacity: 0.6;
    cursor: default;
    border-style: dashed;
  }

  /* Estilo especial para o Card Featured (Creative UI) */
  &.featured {
    border-color: rgba(216, 180, 254, 0.3);
    &:hover {
        border-color: #d8b4fe;
        box-shadow: 0 10px 40px -10px rgba(216, 180, 254, 0.3);
    }
  }

  /* Efeito Hover Padrão */
  &:not(.locked):hover {
    transform: translateY(-10px);
    background: rgba(30, 41, 59, 0.6);
    /* Se não for featured, usa azul */
    &:not(.featured) {
        border-color: #38bdf8;
        box-shadow: 0 10px 30px -10px rgba(56, 189, 248, 0.3);
    }

    .hover-text {
        opacity: 1;
        transform: translateY(0);
    }
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
    background: rgba(255,255,255,0.05);
    width: 60px; height: 60px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 12px;
  }

  h3 {
    font-size: 1.5rem;
    color: #f8fafc;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .hover-text {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    color: #38bdf8;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
`;

const StatusBadge = styled.span<{ $active: boolean }>`
  font-size: 0.7rem;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 20px;
  
  background: ${({ $active }) => $active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${({ $active }) => $active ? '#10b981' : '#ef4444'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.2)'};
`;