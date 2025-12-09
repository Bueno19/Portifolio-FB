import React from 'react';
import styled from 'styled-components';

interface Project { title: string; description: string; techs: string[]; link: string; github: string; }

const projectsData: Project[] = [
    {
        title: "Sistema de Quiosque PHP",
        description: "Software completo para gestão de quiosques. Interface visualmente impactante focada na experiência do usuário e agilidade.",
        techs: ["PHP", "MySQL", "HTML5/CSS3", "JavaScript"],
        link: "#",
        github: "https://github.com/Bueno19"
    },
    {
        title: "Python Automation Bot",
        description: "Bot inteligente para automação de tarefas repetitivas, otimizando fluxos de trabalho e aumentando a produtividade.",
        techs: ["Python", "Selenium", "Automação"],
        link: "#",
        github: "https://github.com/Bueno19"
    },
    {
        title: "Portfólio Pessoal",
        description: "Aplicação desenvolvida com React e TypeScript, utilizando animações modernas, tema Dark Dev e integração com APIs.",
        techs: ["React", "TypeScript", "Styled Components", "Vite"],
        link: "#",
        github: "https://github.com/Bueno19"
    }
];

export const Projects: React.FC = () => {
    return (
        // ID OBRIGATÓRIO PARA NAVEGAÇÃO
        <SectionContainer id="projects">
            <Container>
                <HeaderContent>
                    <SectionTitle>
                        <span className="purple">const</span> <span className="blue">myProjects</span> = <span className="yellow">[</span>
                    </SectionTitle>
                    <SubTitle>// Alguns dos códigos que tenho orgulho de ter escrito</SubTitle>
                </HeaderContent>
                <Grid>
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index}>
                            <FolderIcon>📂</FolderIcon>
                            <CardHeader>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <IconLink href={project.github} target="_blank">GitHub</IconLink>
                            </CardHeader>
                            <Description>{project.description}</Description>
                            <TechStack>
                                {project.techs.map(tech => <Tag key={tech}>{tech}</Tag>)}
                            </TechStack>
                        </ProjectCard>
                    ))}
                </Grid>
                <SectionClosing><span className="yellow">]</span>;</SectionClosing>
            </Container>
        </SectionContainer>
    );
};

// --- Estilos ---
const SectionContainer = styled.section` width: 100%; padding: 100px 20px; background-color: #0f172a; display: flex; justify-content: center; `;
const Container = styled.div` width: 100%; max-width: 1200px; `;
const HeaderContent = styled.div` margin-bottom: 60px; text-align: center; `;
const SectionTitle = styled.h2`
    font-size: 2.5rem; color: #e2e8f0; margin-bottom: 10px; font-family: 'Fira Code', monospace;
    .purple { color: #c084fc; } .blue { color: #38bdf8; } .yellow { color: #facc15; }
    @media (max-width: 768px) { font-size: 1.8rem; }
`;
const SubTitle = styled.p` color: #64748b; font-size: 1.1rem; font-family: 'Fira Code', monospace; `;
const SectionClosing = styled.h2` font-size: 2.5rem; color: #e2e8f0; margin-top: 50px; text-align: center; font-family: 'Fira Code', monospace; .yellow { color: #facc15; } `;
const Grid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; `;
const ProjectCard = styled.div`
    background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 12px; padding: 30px;
    transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between; min-height: 280px;
    &:hover { transform: translateY(-10px); border-color: #38bdf8; background: rgba(30, 41, 59, 0.8); box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5); }
`;
const FolderIcon = styled.div` font-size: 2rem; margin-bottom: 1rem; `;
const CardHeader = styled.div` display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; `;
const ProjectTitle = styled.h3` font-size: 1.4rem; color: #f8fafc; font-weight: 700; `;
const IconLink = styled.a`
    font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #94a3b8; text-decoration: none;
    border: 1px solid #475569; padding: 4px 8px; border-radius: 4px; transition: 0.3s;
    &:hover { color: #38bdf8; border-color: #38bdf8; background: rgba(56, 189, 248, 0.1); }
`;
const Description = styled.p` color: #94a3b8; font-size: 1rem; line-height: 1.6; margin-bottom: 25px; flex-grow: 1; `;
const TechStack = styled.div` display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto; `;
const Tag = styled.span` font-family: 'Fira Code', monospace; font-size: 0.75rem; color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 4px 10px; border-radius: 20px; `;