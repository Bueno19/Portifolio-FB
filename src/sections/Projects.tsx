import React from 'react';
import styled from 'styled-components';

// --- INTERFACE DE TIPAGEM ---
interface Project {
    id: number;
    icon: string;
    title: string;
    description: React.ReactNode;
    githubUrl: string;
    liveUrl?: string; // Opcional: Se não tiver, renderiza o ícone de terminal
    techs: string[];
}

// --- DADOS DOS PROJETOS (SEUS 4 REPOSITÓRIOS) ---
const myBestProjects: Project[] = [
    {
        id: 1,
        icon: '🎨',
        title: 'Portfólio Profissional',
        description: <>SPA moderna desenvolvida para demonstração de habilidades técnicas. Foco em <strong>código limpo</strong>, componentização, Glassmorphism e alta fidelidade responsiva.</>,
        githubUrl: 'https://github.com/Bueno19/Portifolio-FB',
        liveUrl: 'https://portifolio-fb.vercel.app',
        techs: ['React', 'TypeScript', 'Styled Components', 'Vite']
    },
    {
        id: 2,
        icon: '🎟️',
        title: 'Site de Rifas',
        description: <>Aplicação interativa para gerenciamento e venda de rifas online, focada em uma <strong>experiência de usuário fluida</strong> e interface intuitiva.</>,
        githubUrl: 'https://github.com/Bueno19/SiteRifa',
        techs: ['React', 'TypeScript', 'Styled Components'] 
    },
    {
        id: 3,
        icon: '🧠',
        title: 'Segundo Cérebro',
        description: <>Sistema voltado para gestão de conhecimento e produtividade pessoal. Implementação com foco em <strong>estruturação de dados</strong> e navegação otimizada.</>,
        githubUrl: 'https://github.com/Bueno19/segundo-cerebro',
        techs: ['React', 'TypeScript', 'Styled Components'] 
    },
    {
        id: 4,
        icon: '📂',
        title: 'Kiosk Manager',
        description: <>Sistema de PDV robusto para automação comercial. Desenvolvido em arquitetura <strong>MVC nativa</strong> com rotinas de instalação automatizada do banco de dados.</>,
        githubUrl: 'https://github.com/Bueno19/Quiosque-php',
        techs: ['PHP 8', 'MySQL', 'MVC', 'POO']
    }
];

// --- COMPONENTE PRINCIPAL ---
export const Projects: React.FC = () => {
    return (
        <Container>
            {/* CABEÇALHO */}
            <CodeHeader>
                <div className="line-code">
                    <span className="keyword">const</span> 
                    <span className="var-name"> myProjects</span>
                    <span className="operator"> = </span>
                    <span className="bracket"> [</span>
                </div>
                <div className="comment">// Os melhores códigos que tenho orgulho de ter escrito</div>
            </CodeHeader>
            
            <ProjectsGrid>
                {/* RENDERIZAÇÃO DINÂMICA DOS CARDS */}
                {myBestProjects.map((project) => (
                    <ProjectCard key={project.id}>
                        <CardTop>
                            <IconBox>
                                {project.icon}
                            </IconBox>
                            <Links>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="Ver no GitHub">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                </a>
                                
                                {project.liveUrl ? (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Ver Aplicação Online">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </a>
                                ) : (
                                    <span className="disabled" title="Deploy não disponível / Executar via Terminal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                                    </span>
                                )}
                            </Links>
                        </CardTop>

                        <CardContent>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </CardContent>

                        <TechTags>
                            {project.techs.map((tech, index) => (
                                <span key={index} className={tech.toLowerCase()}>{tech}</span>
                            ))}
                        </TechTags>
                    </ProjectCard>
                ))}
            </ProjectsGrid>
            
            <CodeFooter>
                <span className="bracket">]</span>
            </CodeFooter>
        </Container>
    );
};

// --- ESTILOS ---

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
    gap: 2.5rem; 
`;

const ProjectCard = styled.div`
    background: rgba(30, 41, 59, 0.7); 
    backdrop-filter: blur(10px);
    
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);

    &:hover {
        transform: translateY(-10px);
        border-color: #38bdf8;
        background: rgba(30, 41, 59, 0.9);
        box-shadow: 0 0 30px rgba(56, 189, 248, 0.15); 
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
    flex-grow: 1; 
    
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