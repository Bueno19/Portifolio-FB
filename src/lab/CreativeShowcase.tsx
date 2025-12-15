import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components'; // Removido 'css' que não estava sendo usado

// =============================================================================
// 1. COMPONENTES VISUAIS (DEMOS)
// =============================================================================

// --- DEMO 1: SHINY TEXT (Texto com brilho de metal líquido) ---
const ShinyText = () => <ShinyWrapper>PLATINUM</ShinyWrapper>;
const shineAnim = keyframes` 0% { background-position: 200% center; } 100% { background-position: -200% center; } `;
const ShinyWrapper = styled.h2`
  font-size: 2.5rem; font-weight: 800; letter-spacing: 4px; text-transform: uppercase;
  background: linear-gradient(to right, #444 20%, #fff 40%, #fff 60%, #444 80%);
  background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: ${shineAnim} 3s linear infinite;
`;

// --- DEMO 2: RGB BORDER (Corrigido para compatibilidade) ---
const GradientBorder = () => {
  return (
    <RGBBox>
      <div className="content">RGB</div>
    </RGBBox>
  );
};
const spin = keyframes` 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } `;
const RGBBox = styled.div`
  position: relative; width: 140px; height: 140px; background: #111;
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  
  &::before {
    content: ''; position: absolute; width: 150%; height: 150%;
    background: conic-gradient(#ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000);
    animation: ${spin} 3s linear infinite;
  }
  
  .content {
    position: relative; background: #1a1a1a; width: 94%; height: 94%;
    border-radius: 8px; z-index: 1; display: flex; align-items: center; justify-content: center;
    color: white; font-weight: bold; letter-spacing: 2px;
  }
`;

// --- DEMO 3: GLASSMORPHISM (Com fundo para ver o efeito) ---
const GlassCard = () => (
  <GlassWrapper>
    <div className="blob"></div>
    <div className="glass">
      <span>FROSTED</span>
    </div>
  </GlassWrapper>
);
const float = keyframes` 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } `;
const GlassWrapper = styled.div`
  width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center;
  .blob {
    position: absolute; width: 80px; height: 80px; background: linear-gradient(135deg, #7b2cbf, #ff0076);
    border-radius: 50%; animation: ${float} 4s ease-in-out infinite;
  }
  .glass {
    width: 140px; height: 80px; background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px); /* O Segredo do vidro */
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: bold; letter-spacing: 1px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
`;

// --- DEMO 4: MAGNETIC BUTTON (Física Suave) ---
const MagneticButton = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3; // Força do ímã
    const y = (e.clientY - (top + height / 2)) * 0.3;
    btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleLeave = () => { if(btnRef.current) btnRef.current.style.transform = `translate(0, 0)`; };
  return <MagBtn ref={btnRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>HOVER ME</MagBtn>;
};
const MagBtn = styled.button`
  padding: 12px 30px; background: white; color: black; border: none; border-radius: 30px;
  font-weight: 800; font-size: 0.9rem; cursor: pointer; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2); &:hover { transform: scale(1.1); }
`;

// --- DEMO 5: SPOTLIGHT CARD (Luz de Lanterna) ---
const Spotlight = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--x', `${e.clientX - left}px`);
    divRef.current.style.setProperty('--y', `${e.clientY - top}px`);
  };
  return (
    <SpotBox ref={divRef} onMouseMove={handleMove}>
      <div className="content">REVEAL</div>
    </SpotBox>
  );
};
const SpotBox = styled.div`
  width: 200px; height: 120px; background: #111; border-radius: 12px; border: 1px solid #222;
  display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
  .content { position: relative; z-index: 2; color: #555; font-weight: bold; transition: color 0.2s; }
  &::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(250px circle at var(--x) var(--y), rgba(255,255,255,0.1), transparent 40%);
    pointer-events: none; z-index: 1;
  }
  &:hover { border-color: #444; .content { color: white; } }
`;

// --- DEMO 6: TYPEWRITER (Efeito Digitação) ---
const Typewriter = () => {
  const [text, setText] = useState('');
  const phrase = "<Hello World />";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(phrase.slice(0, i + 1));
      i++; if (i > phrase.length) i = 0;
    }, 200);
    return () => clearInterval(timer);
  }, []);
  return <TypeTxt>{text}<span className="cursor">_</span></TypeTxt>;
};
const blink = keyframes` 50% { opacity: 0; } `;
const TypeTxt = styled.div` font-family: 'Fira Code', monospace; font-size: 1.2rem; color: #0f0; text-shadow: 0 0 5px #0f0; .cursor { animation: ${blink} 1s infinite; color: white; } `;

// =============================================================================
// 2. DADOS DA BIBLIOTECA (CÓDIGOS PARA COPIAR)
// =============================================================================

const LIBRARY = [
  {
    id: 'shiny', title: 'Shiny Metal Text', category: 'Text',
    component: <ShinyText />,
    code: `// Texto Metálico Brilhante
const shine = keyframes\` 
  0% { background-position: 200% center; } 
  100% { background-position: -200% center; } 
\`;

const ShinyText = styled.h2\`
  background: linear-gradient(to right, #444 20%, #fff 40%, #fff 60%, #444 80%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: \${shine} 3s linear infinite;
\`;`
  },
  {
    id: 'gradient', title: 'RGB Border', category: 'CSS',
    component: <GradientBorder />,
    code: `// Borda RGB Giratória (Compatível)
const spin = keyframes\` 
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); } 
\`;

const RGBBox = styled.div\`
  position: relative; overflow: hidden;
  
  &::before {
    content: ''; position: absolute; 
    width: 150%; height: 150%; left: -25%; top: -25%;
    background: conic-gradient(red, blue, green, yellow, red);
    animation: \${spin} 3s linear infinite;
  }
\`;`
  },
  {
    id: 'glass', title: 'Glassmorphism', category: 'CSS',
    component: <GlassCard />,
    code: `// Efeito de Vidro Fosco
const Glass = styled.div\`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px); /* O Segredo */
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
\`;`
  },
  {
    id: 'magnet', title: 'Magnetic Button', category: 'Interactive',
    component: <MagneticButton />,
    code: `// Botão Magnético (React + CSS Transform)
const handleMove = (e) => {
  const { left, top, width, height } = ref.current.getBoundingClientRect();
  const x = (e.clientX - (left + width / 2)) * 0.3;
  const y = (e.clientY - (top + height / 2)) * 0.3;
  ref.current.style.transform = \`translate(\${x}px, \${y}px)\`;
};`
  },
  {
    id: 'spotlight', title: 'Spotlight Reveal', category: 'Interactive',
    component: <Spotlight />,
    code: `// Efeito de Lanterna
const handleMove = (e) => {
  const x = e.clientX - left;
  const y = e.clientY - top;
  div.style.setProperty('--x', \`\${x}px\`);
  div.style.setProperty('--y', \`\${y}px\`);
};

// CSS:
// background: radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.1), transparent);`
  },
  {
    id: 'typewriter', title: 'Typewriter', category: 'Text',
    component: <Typewriter />,
    code: `// Efeito de Digitação
useEffect(() => {
  let i = 0;
  const timer = setInterval(() => {
    setText(phrase.slice(0, i));
    i++;
    if (i > phrase.length) i = 0;
  }, 200);
  return () => clearInterval(timer);
}, []);`
  }
];

const CATEGORIES = ['All', 'Interactive', 'Text', 'CSS'];

// =============================================================================
// 3. ESTRUTURA PRINCIPAL
// =============================================================================

export const CreativeShowcase: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeItem, setActiveItem] = useState<typeof LIBRARY[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' ? LIBRARY : LIBRARY.filter(i => i.category === filter);

  return (
    <Overlay>
      <GridBackground />
      <Container>
        <Header>
          <div className="title"><span>✨</span> CREATIVE_LAB <small>v3.0</small></div>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        {activeItem ? (
          <DetailView>
            <BackButton onClick={() => setActiveItem(null)}>← Voltar para Galeria</BackButton>
            <div className="split-screen">
              <div className="preview-pane">{activeItem.component}</div>
              <div className="code-pane">
                <div className="code-header"><span>{activeItem.title}.tsx</span><span className="lang">React/TS</span></div>
                <pre><code>{activeItem.code}</code></pre>
              </div>
            </div>
          </DetailView>
        ) : (
          <Gallery>
            <div className="intro">
              <h1>UI Experiments</h1>
              <p>Coleção de componentes interativos e efeitos visuais avançados.</p>
            </div>
            
            <FilterBar>
              {CATEGORIES.map(cat => (
                <FilterBtn key={cat} $active={filter === cat} onClick={() => setFilter(cat)}>{cat}</FilterBtn>
              ))}
            </FilterBar>

            <Grid>
              {filteredItems.map((item) => (
                <Card key={item.id} onClick={() => setActiveItem(item)}>
                  <div className="preview-mini">
                    {/* O componente "vivo" é mostrado na miniatura */}
                    <div className="mini-content">{item.component}</div>
                  </div>
                  <div className="info">
                    <div className="card-header">
                      <h3>{item.title}</h3>
                      <Badge>{item.category}</Badge>
                    </div>
                    <button>VER CÓDIGO &rarr;</button>
                  </div>
                </Card>
              ))}
            </Grid>
          </Gallery>
        )}
      </Container>
    </Overlay>
  );
};

// --- ESTILOS GERAIS ---

const fadeIn = keyframes` from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } `;

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: #050505; z-index: 9999; overflow-y: auto;
  font-family: 'Segoe UI', sans-serif;
`;

const GridBackground = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px; z-index: -1;
`;

const Container = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 30px; animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #222; margin-bottom: 50px;
  .title { font-family: 'Fira Code', monospace; font-size: 1.5rem; color: white; display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: -1px; }
  small { font-size: 0.7rem; color: #888; background: #1a1a1a; padding: 4px 8px; border-radius: 6px; border: 1px solid #333; }
`;

const CloseButton = styled.button`
  background: rgba(255,255,255,0.05); border: 1px solid #333; color: white; width: 40px; height: 40px; 
  cursor: pointer; border-radius: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center;
  &:hover { background: #fff; color: #000; border-color: #fff; }
`;

const Gallery = styled.div`
  .intro { text-align: center; margin-bottom: 50px; 
    h1 { font-size: 3rem; margin-bottom: 10px; background: linear-gradient(to bottom, #fff, #666); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -2px; } 
    p { color: #666; font-size: 1.1rem; } 
  }
`;

const FilterBar = styled.div` display: flex; justify-content: center; gap: 10px; margin-bottom: 50px; flex-wrap: wrap; `;
const FilterBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => $active ? '#fff' : 'rgba(255,255,255,0.03)'};
  color: ${({ $active }) => $active ? '#000' : '#888'};
  border: 1px solid ${({ $active }) => $active ? '#fff' : '#333'};
  padding: 8px 24px; border-radius: 30px; cursor: pointer; font-weight: 600; transition: all 0.3s;
  &:hover { border-color: #fff; color: ${({ $active }) => $active ? '#000' : '#fff'}; }
`;

const Grid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; `;

const Card = styled.div`
  background: rgba(15, 15, 15, 0.6); border: 1px solid #222; border-radius: 20px; overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; display: flex; flex-direction: column;
  box-shadow: 0 0 0 1px transparent;
  
  &:hover { 
    transform: translateY(-8px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); border-color: #444;
    button { color: #fff; opacity: 1; transform: translateX(5px); }
  }

  .preview-mini {
    height: 200px; background: #050505; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; pointer-events: none; border-bottom: 1px solid #222;
    background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px;
  }

  .info {
    padding: 25px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    h3 { margin: 0; font-size: 1.1rem; color: #eee; font-weight: 600; }
    button { background: transparent; border: none; color: #666; font-weight: bold; cursor: pointer; opacity: 0.7; transition: all 0.3s; align-self: flex-start; margin-top: 15px; font-size: 0.8rem; letter-spacing: 1px; }
  }
`;

const Badge = styled.span` font-size: 0.65rem; background: rgba(255,255,255,0.05); color: #888; padding: 4px 8px; border-radius: 6px; border: 1px solid #333; font-weight: 600; `;

const DetailView = styled.div`
  height: calc(100vh - 140px); display: flex; flex-direction: column;
  .split-screen { display: flex; flex: 1; gap: 30px; margin-top: 30px; @media (max-width: 768px) { flex-direction: column; } }
  .preview-pane { flex: 1; background: #0a0a0a; border-radius: 20px; border: 1px solid #222; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: inset 0 0 100px rgba(0,0,0,0.5); }
  .code-pane { flex: 1; background: #0d0d0d; border-radius: 20px; border: 1px solid #222; overflow: hidden; display: flex; flex-direction: column; }
  .code-header { background: #151515; padding: 15px 25px; font-family: 'Fira Code', monospace; font-size: 0.85rem; color: #666; display: flex; justify-content: space-between; border-bottom: 1px solid #222; font-weight: 600; }
  pre { margin: 0; padding: 25px; overflow: auto; flex: 1; color: #a9b7c6; font-family: 'Fira Code', monospace; font-size: 0.9rem; line-height: 1.6; }
`;

const BackButton = styled.button`
  align-self: flex-start; background: none; border: none; color: #666; cursor: pointer; font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: color 0.2s;
  &:hover { color: white; }
`;