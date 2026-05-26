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
    isLocked: boolean; // Controla se a página já está pronta ou não
    badgeText: string;
    badgeActive: boolean;
    isFeatured?: boolean; // Deixa o card com brilho especial (opcional)
}

// 2. LISTA DE EXPERIMENTOS
const experiments: Experiment[] = [
    {
        id: 'market',
        icon: '💰',
        title: 'Market Monitor',
        description: 'Dashboard financeiro com cotações de Ações (B3), Cripto e Moedas em tempo real.',
        isLocked: true, // Mudamos para TRUE para bloquear o card por enquanto
        badgeText: 'EM DESENVOLVIMENTO',
        badgeActive: false
    },
    {
        id: 'gamer',
        icon: '🎮',
        title: 'Gamer Zone',
        description: 'Interface temática estilo Steam/Cyberpunk com biblioteca de jogos, setup e perfil interativo.',
        isLocked: true, // Mudamos para TRUE para bloquear
        badgeText: 'EM BREVE',
        badgeActive: false
    },
    {
        id: 'chatbot',
        icon: '🤖',
        title: 'AI Assistant',
        description: 'Chatbot inteligente simulado para responder dúvidas sobre o portfólio e tecnologias.',
        isLocked: false, // Digamos que você queira deixar este ABERTO
        badgeText: 'ONLINE (DEMO)',
        badgeActive: true
    },
    {
        id: 'creative',
        icon: '✨',
        title: 'Creative UI',
        description: 'Galeria de componentes visuais avançados (Holo Card, Magnetic Button).',
        isLocked: false, // Digamos que você queira deixar este ABERTO também
        badgeText: 'NEW',
        badgeActive: true,
        isFeatured: true
    }
];

export const Playground: React.FC<PlaygroundProps> = ({ onChangeView }) => {
    
    // Função para lidar com o clique
    const handleCardClick = (exp: Experiment) => {
        // Só muda de tela se a função onChangeView existir E o card NÃO estiver bloqueado
        if (onChangeView && !exp.isLocked) {
            onChangeView(exp.id);
        }
    };

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
                {/* 3. RENDERIZAÇÃO DINÂMICA */}
                {experiments.map((exp) => (
                    <Card 
                        key={exp.id}
                        onClick={() => handleCardClick(exp)}
                        // Adiciona as classes CSS dependendo do estado do experimento
                        className={`${exp.isLocked ? 'locked' : ''} ${exp.isFeatured ? 'featured' : ''}`}
                    >
                        <div className="icon">{exp.icon}</div>
                        <h3>{exp.title}</h3>
                        <p>{exp.description}</p>
                        
                        {/* Se for destaque, usa a cor roxa (como no seu código original), senão usa o padrão */}
                        {exp.isFeatured ? (
                            <StatusBadge $active={exp.badgeActive} style={{ borderColor: '#d8b4fe', color: '#d8b4fe', background: 'rgba(216, 180, 254, 0.1)' }}>
                                {exp.badgeText}
                            </StatusBadge>
                        ) : (
                            <StatusBadge $active={exp.badgeActive}>
                                {exp.badgeText}
                            </StatusBadge>
                        )}

                        {/* Texto de hover que só aparece se não estiver bloqueado */}
                        {!exp.isLocked && (
                            <div className="hover-text" style={{ color: exp.isFeatured ? '#d8b4fe' : '#38bdf8' }}>
                                ABRIR MÓDULO
                            </div>
                        )}
                    </Card>
                ))}
            </Grid>
        </Container>
    );
};

// --- ESTILOS (Mantidos iguaizinhos aos seus!) ---

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

  &.locked {
    opacity: 0.6;
    cursor: not-allowed; /* Mudei para not-allowed para ficar claro que não clica */
    border-style: dashed;
  }

  &.featured {
    border-color: rgba(216, 180, 254, 0.3);
    &:hover:not(.locked) {
        border-color: #d8b4fe;
        box-shadow: 0 10px 40px -10px rgba(216, 180, 254, 0.3);
    }
  }

  &:not(.locked):hover {
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