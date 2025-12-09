import React from 'react';
import styled from 'styled-components';

export const Projects: React.FC = () => {
    return (
        <Container>
            {/* CABEÇALHO (Mantido o estilo Array que você gostou) */}
            <CodeHeader>
                <div className="line-code">
                    <span className="keyword">const</span> 
                    <span className="var-name"> myProjects</span>
                    <span className="operator"> = </span>
                    <span className="bracket"> [</span>
                </div>
                <div className="comment">// Alguns dos códigos que tenho orgulho de ter escrito</div>
            </CodeHeader>
            
            <ProjectsGrid>
                
                {/* --- CARD 1: KIOSK MANAGER --- */}
                <ProjectCard>
                    <CardTop>
                        <IconBox>
                            📂
                        </IconBox>
                        <Links>
                            <a href="https://github.com/Bueno19/Quiosque-php" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="https://github.com/Bueno19/Quiosque-php#readme" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                        </Links>
                    </CardTop>

                    <CardContent>
                        <h3>Kiosk Manager</h3>
                        <p>
                            Sistema de PDV robusto. Arquitetura <strong>MVC em PHP Puro</strong> com instalação automática de Banco de Dados.
                        </p>
                    </CardContent>

                    <TechTags>
                        <span>PHP 8</span>
                        <span>MySQL</span>
                        <span>MVC</span>
                    </TechTags>
                </ProjectCard>

                {/* --- CARD 2: BOT DE SENHA --- */}
                <ProjectCard>
                    <CardTop>
                        <IconBox>
                            🤖
                        </IconBox>
                        <Links>
                            <a href="https://github.com/Bueno19/Botsenha" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <span className="disabled" title="Executar via Terminal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                            </span>
                        </Links>
                    </CardTop>

                    <CardContent>
                        <h3>Bot de Senha</h3>
                        <p>
                            Automação inteligente para segurança. Gera e gerencia senhas fortes automaticamente via script.
                        </p>
                    </CardContent>

                    <TechTags>
                        <span className="python">Python</span>
                        <span>Automation</span>
                        <span>Security</span>
                    </TechTags>
                </ProjectCard>

                {/* --- CARD 3: PORTFÓLIO --- */}
                <ProjectCard>
                    <CardTop>
                        <IconBox>
                            🎨
                        </IconBox>
                        <Links>
                            <a href="https://github.com/Bueno19/Portifolio-FB" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="https://portifolio-fb.vercel.app" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                        </Links>
                    </CardTop>

                    <CardContent>
                        <h3>Portfólio Pessoal</h3>
                        <p>
                            SPA moderna com animações suaves, Dark Mode e deploy automático na Vercel.
                        </p>
                    </CardContent>

                    <TechTags>
                        <span>React</span>
                        <span>TypeScript</span>
                        <span>Styled</span>
                    </TechTags>
                </ProjectCard>

            </ProjectsGrid>
            
            <CodeFooter>
                <span className="bracket">]</span>
            </CodeFooter>
        </Container>
    );
};

// --- ESTILOS NOVOS ---

const Container = styled.div`
    padding: 6rem 2rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
`;

const CodeHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Fira Code', monospace;
    font-size: 2.2rem;
    margin-bottom: 4rem;
    text-align: center;
    
    @media (max-width: 768px) { font-size: 1.4rem; }

    .line-code { margin-bottom: 10px; }
    .keyword { color: #c792ea; font-weight: bold; }
    .var-name { color: #82aaff; }
    .operator { color: #89ddff; }
    .bracket { color: #ffd700; }
    .comment { 
        color: #607b96; font-size: 1rem; 
        font-family: 'Fira Code', monospace; opacity: 0.8;
    }
`;

const CodeFooter = styled.div`
    display: flex; justify-content: center;
    font-family: 'Fira Code', monospace; font-size: 2.5rem;
    margin-top: 3rem; .bracket { color: #ffd700; }
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem; /* Mais espaço entre os cards */
`;

const ProjectCard = styled.div`
    /* Efeito Glassmorphism Leve */
    background: rgba(30, 41, 59, 0.7); 
    backdrop-filter: blur(10px);
    
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    
    /* Sombra suave */
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);

    &:hover {
        transform: translateY(-10px);
        border-color: #38bdf8;
        background: rgba(30, 41, 59, 0.9);
        box-shadow: 0 0 30px rgba(56, 189, 248, 0.15); /* Brilho neon ao redor */
    }
`;

const CardTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const IconBox = styled.div`
    font-size: 2rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(56, 189, 248, 0.1);
    border-radius: 12px;
    color: #38bdf8;
    transition: 0.3s;
    
    ${ProjectCard}:hover & {
        background: #38bdf8;
        color: #0f172a;
        transform: rotate(-10deg);
    }
`;

const Links = styled.div`
    display: flex; gap: 1rem;
    
    a, .disabled {
        color: #cbd5e1;
        transition: all 0.3s;
        cursor: pointer;
        
        &:hover { 
            color: #38bdf8; 
            transform: scale(1.2);
        }
    }
    .disabled { opacity: 0.5; cursor: not-allowed; }
`;

const CardContent = styled.div`
    flex-grow: 1; /* Empurra as tags para baixo */
    
    h3 {
        color: #f8fafc;
        font-size: 1.6rem;
        margin-bottom: 1rem;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        transition: color 0.3s;
        
        ${ProjectCard}:hover & { color: #38bdf8; }
    }

    p {
        color: #94a3b8;
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        
        strong { color: #38bdf8; font-weight: 600; }
    }
`;

const TechTags = styled.div`
    display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto;
    
    span {
        font-family: 'Fira Code', monospace;
        font-size: 0.75rem;
        padding: 6px 14px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.05);
        color: #cbd5e1;
        transition: all 0.3s;

        &:hover {
            background: rgba(56, 189, 248, 0.2);
            color: #38bdf8;
        }

        &.python {
            &:hover { background: rgba(255, 235, 59, 0.2); color: #ffeb3b; }
        }
    }
`;