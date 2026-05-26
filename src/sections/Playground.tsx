import React from 'react';
import styled from 'styled-components';

interface PlaygroundProps {
    onChangeView?: (view: 'home' | 'market' | 'gamer' | 'chatbot' | 'creative') => void;
}

// 1. TIPAGEM DOS EXPERIMENTOS
interface Experiment {
    id: 'market' | 'gamer' | 'chatbot' | 'creative';
    icon: string;
    title: string;
    description: string;
    badgeText: string;
    hoverText: string;
    isFeatured?: boolean; // Para o efeito roxo especial do Creative UI
}

// 2. LISTA DE EXPERIMENTOS (TUDO DESBLOQUEADO)
const experiments: Experiment[] = [
    {
        id: 'market',
        icon: '💰',
        title: 'Market Monitor',
        description: 'Dashboard financeiro com cotações de Ações (B3), Cripto e Moedas em tempo real.',
        badgeText: 'ONLINE',
        hoverText: 'ABRIR DASHBOARD'
    },
    {
        id: 'gamer',
        icon: '🎮',
        title: 'Gamer Zone',
        description: 'Interface temática estilo Steam/Cyberpunk com biblioteca de jogos, setup e perfil interativo.',
        badgeText: 'LIVE v2.0',
        hoverText: 'ENTRAR NA ZONE'
    },
    {
        id: 'chatbot',
        icon: '🤖',
        title: 'AI Assistant',
        description: 'Chatbot inteligente simulado para responder dúvidas sobre o portfólio e tecnologias.',
        badgeText: 'ONLINE (DEMO)',
        hoverText: 'INICIAR CONVERSA'
    },
    {
        id: 'creative',
        icon: '✨',
        title: 'Creative UI',
        description: 'Galeria de componentes visuais avançados (Holo Card, Magnetic Button).',
        badgeText: 'NEW',
        hoverText: 'EXPLORAR UI',
        isFeatured: true
    }
];

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
                <span className="keyword">const</span> <span className="var">experiments</span> = [
                    <span className="string">'Finance'</span>, 
                    <span className="string">'Gaming'</span>, 
                    <span className="string">'AI'</span>, 
                    <span className="string">'Creative UI'</span>
                ];
            </CodeSnippet>

            <Grid>
                {/* 3. RENDERIZAÇÃO DINÂMICA (DRY) */}
                {experiments.map((exp) => (
                    <Card 
                        key={exp.id}
                        onClick={() => onChangeView && onChangeView(exp.id)}
                        className={exp.isFeatured ? 'featured' : ''}
                    >
                        <div className="icon">{exp.icon}</div>
                        <h3>{exp.title}</h3>
                        <p>{exp.description}</p>
                        
                        {/* Se for destaque (Creative UI), usa estilo roxo, senão usa o padrão (verde) */}
                        {exp.isFeatured ? (
                            <StatusBadge 
                                $active={true} 
                                style={{ borderColor: '#d8b4fe', color: '#d8b4fe', background: 'rgba(216, 180, 254, 0.1)' }}
                            >
                                {exp.badgeText}
                            </StatusBadge>
                        ) : (
                            <StatusBadge $active={true}>
                                {exp.badgeText}
                            </StatusBadge>
                        )}

                        <div 
                            className="hover-text" 
                            style={{ color: exp.isFeatured ? '#d8b4fe' : '#38bdf8' }}
                        >
                            {exp.hoverText}
                        </div>
                    </Card>
                ))}
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
  .keyword { color: #ff79c6; } 
  .var { color: #f8f8f2; }     
  .string { color: #f1fa8c; }  

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  min-height: 260px; 

  /* Estilo especial para o Card Featured (Creative UI) */
  &.featured {
    border-color: rgba(216, 180, 254, 0.3);
    &:hover {
        border-color: #d8b4fe;
        box-shadow: 0 10px 40px -10px rgba(216, 180, 254, 0.3);
    }
  }

  /* Efeito Hover Padrão */
  &:hover {
    transform: translateY(-10px);
    background: rgba(30, 41, 59, 0.6);
    
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