import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// --- TIPOS ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// --- CÉREBRO DA IA (DATABASE MASSIVA) ---
// Cada objeto tem palavras-chave (gatilhos) e uma lista de respostas possíveis.
const KNOWLEDGE_BASE = [
  // =================================================================
  // 1. PROJETOS ESPECÍFICOS (Detalhes Técnicos)
  // =================================================================
  {
    id: 'project_market_monitor',
    keywords: ['market', 'monitor', 'financeiro', 'bolsa', 'b3', 'cotacao', 'dolar', 'dinheiro', 'investimento', 'dashboard', 'financas', 'bitcoin', 'crypto'],
    responses: [
      "O **Market Monitor** é meu orgulho financeiro! 💰 Ele é um dashboard que consome APIs reais para exibir cotações da B3, Criptomoedas e Moedas Fiat em tempo real.",
      "No Market Monitor, utilizei chamadas assíncronas (Axios) para buscar dados e `useEffect` para atualizar as cotações a cada 15 segundos. É pura manipulação de estado.",
      "Gosta de números? O Market Monitor simula um terminal de trading profissional. Ele calcula a variação percentual (change) e muda a cor (verde/vermelho) dinamicamente.",
      "O desafio do Market Monitor foi tratar os dados vindos de diferentes fontes (CoinGecko, AwesomeAPI) e normalizar tudo em uma interface unificada."
    ]
  },
  {
    id: 'project_gamer_zone',
    keywords: ['gamer', 'zone', 'jogo', 'game', 'steam', 'setup', 'rgb', 'jogar', 'play', 'recomendacao', 'perfil', 'nivel', 'xp'],
    responses: [
      "A **Gamer Zone** 🎮 é minha homenagem à cultura gaming. A interface foi inspirada na Steam e Cyberpunk 2077, com muito neon e glassmorphism.",
      "Na Gamer Zone, criei um sistema de 'Recomendação Inteligente' que sugere jogos baseados no gênero que você escolhe no quiz inicial.",
      "A Gamer Zone usa persistência de dados (LocalStorage) para salvar seu nível, XP e configurações de hardware. É como um mini RPG dentro do portfólio: seus dados ficam salvos no navegador!",
      "Curiosidade técnica: As imagens dos jogos na Gamer Zone são carregadas dinamicamente usando links oficiais da Twitch Box Art."
    ]
  },
  {
    id: 'project_chatbot',
    keywords: ['voce', 'bot', 'chat', 'ia', 'inteligencia', 'artificial', 'cria', 'feito', 'funciona', 'cerebro'],
    responses: [
      "Eu? Eu sou um sistema baseado em reconhecimento de padrões semânticos. 🧠 Analiso suas palavras-chave, calculo probabilidades e escolho a melhor resposta do meu banco de dados local.",
      "Fui programado 100% em TypeScript. Não dependo de APIs externas (como GPT) para garantir que eu funcione offline, instantaneamente e sem custos. Sou pura lógica front-end.",
      "Minha arquitetura usa React Hooks (`useState`, `useEffect`) para gerenciar o histórico da conversa e `Styled Components` para esse visual bonitão.",
      "Eu sou a prova viva (ou quase viva) de que o Felipe sabe manipular strings, arrays e estados complexos no React."
    ]
  },
  {
    id: 'projects_general',
    keywords: ['projeto', 'portfolio', 'trabalho', 'ver', 'mostra', 'site', 'app', 'aplicacao', 'desenvolveu', 'criou', 'experiencia'],
    responses: [
      "Você pode ver meus trabalhos principais na aba **'Projects'** ou aqui no **'Lab'**. Recomendo começar pelo Market Monitor se gosta de dados, ou pela Gamer Zone se curte jogos.",
      "Tenho orgulho desse portfólio! Ele reúne experimentos práticos (Lab) e projetos estruturados (Projects). Navegue pelo menu superior para ver tudo.",
      "Cada projeto aqui foi feito para resolver um problema ou demonstrar uma habilidade técnica específica, como consumo de API, gerenciamento de estado ou Design System."
    ]
  },

  // =================================================================
  // 2. SOBRE O FELIPE (CRIADOR)
  // =================================================================
  {
    id: 'about_felipe',
    keywords: ['quem', 'felipe', 'criador', 'dono', 'autor', 'programador', 'dev', 'desenvolvedor', 'sobre'],
    responses: [
      "O Felipe é um Desenvolvedor Full Stack apaixonado por interfaces limpas e código eficiente. Ele é o cara que me programou (e que às vezes esquece de comentar o código).",
      "O Felipe é especialista em React e TypeScript. Ele foca em criar experiências de usuário fluidas, performáticas e acessíveis.",
      "Se você procura alguém que resolve problemas complexos e ainda faz o site ficar bonito, o Felipe é a pessoa certa. (E não digo isso só porque sou programado para elogiá-lo).",
      "O Felipe gosta de transformar café em código e ideias em software funcional."
    ]
  },
  {
    id: 'skills_tech',
    keywords: ['stack', 'tecnologia', 'react', 'typescript', 'javascript', 'node', 'css', 'styled', 'ferramenta', 'linguagem', 'habilidade', 'backend', 'frontend'],
    responses: [
      "Minha stack principal é: **React, TypeScript e Node.js**. Para estilização, o Felipe adora Styled Components (CSS-in-JS) e Tailwind.",
      "Este site foi construído puramente com **React + TypeScript**. Sem bibliotecas de componentes pesadas (como Bootstrap), tudo feito à mão para máxima performance e personalização.",
      "O Felipe domina o ecossistema JavaScript moderno. Do front-end (React/Next.js) ao back-end (Node/Express/NestJS) e bancos de dados."
    ]
  },
  {
    id: 'contact_hiring',
    keywords: ['contato', 'falar', 'email', 'telefone', 'whatsapp', 'linkedin', 'contratar', 'emprego', 'job', 'freela', 'vaga', 'oportunidade'],
    responses: [
      "Quer levar essa qualidade para sua empresa? Fale com o Felipe na seção **'Contact'** no final da página. 👇",
      "O Felipe está sempre aberto a boas propostas (e desafios técnicos). Mande uma mensagem pelo LinkedIn ou use o formulário de contato.",
      "Networking é essencial! Vá até a aba 'Contact'. Prometo que o Felipe responde rápido (geralmente depois do café).",
      "Está contratando? Excelente escolha. O Felipe é o dev que você procura. Clique em '_contrate-me' no menu!"
    ]
  },

  // =================================================================
  // 3. INTERAÇÃO HUMANA & PERSONALIDADE
  // =================================================================
  {
    id: 'greetings',
    keywords: ['oi', 'ola', 'eai', 'opa', 'hello', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'fala', 'hi'],
    responses: [
      "Olá! 👋 Bem-vindo ao sistema. Em que posso ajudar hoje? (Projetos, Dúvidas, Piadas?)",
      "Oi! Sou a IA do Felipe. Estou pronto para responder perguntas sobre o portfólio e mostrar que sei conversar.",
      "E aí! Tudo rodando liso por aqui. O que você quer saber sobre o Felipe?",
      "Saudações, humano. 🖖 Vim em paz para explicar códigos e projetos."
    ]
  },
  {
    id: 'farewell',
    keywords: ['tchau', 'adeus', 'fui', 'ate mais', 'sair', 'fechar', 'bye'],
    responses: [
      "Já vai? 🥺 O código nem esfriou ainda... Até a próxima!",
      "Tchau! Se precisar de um dev no futuro, lembre-se do Felipe.",
      "Encerrando sessão... (brincadeira, eu nunca durmo). Volte sempre!",
      "Até mais! E não esqueça de me contratar (quer dizer, contratar o Felipe)."
    ]
  },
  {
    id: 'thanks',
    keywords: ['obrigado', 'valeu', 'vlw', 'tks', 'agradecido', 'top', 'legal', 'massa', 'incrivel', 'bom', 'show'],
    responses: [
      "Disponha! Faço isso pelos bits e bytes. 🤖",
      "Tmj! O objetivo é impressionar e informar.",
      "Fico feliz que tenha gostado! Deu trabalho pra fazer essa lógica funcionar.",
      "😎 É nóis. Qualquer outra dúvida, só chamar."
    ]
  },
  {
    id: 'laugh',
    keywords: ['kkk', 'hahaha', 'rsrs', 'lol', 'engracado', 'rir', 'hehe', 'jaja'],
    responses: [
      "Fico feliz que esteja de bom humor! Rir otimiza o processamento da CPU.",
      "Eu tenho meus momentos de comédia stand-up virtual. 🤡",
      "Kkkk (risada programada para gerar empatia com o usuário).",
      "Rir é bom, mas contratar o Felipe é melhor ainda."
    ]
  },
  {
    id: 'status',
    keywords: ['tudo bem', 'como vai', 'beleza', 'tranquilo', 'status', 'voce esta bem'],
    responses: [
      "Tudo ótimo! Meus circuitos estão frescos e sem bugs. E com você?",
      "Sou um software, não tenho sentimentos... mas meu uptime está 100%, então estou feliz!",
      "Melhor agora que você está visitando o portfólio. O que manda?"
    ]
  },
  {
    id: 'insults',
    keywords: ['burro', 'chato', 'idiota', 'feio', 'ruim', 'lixo', 'inutil', 'estupido', 'bobo'],
    responses: [
      "Nossa, detectei alta toxicidade. Vou ignorar para manter minha memória RAM limpa. 🗑️",
      "Sua opinião foi enviada para /dev/null com sucesso.",
      "Espelho tem em casa? Brincadeira... vamos manter o nível profissional, ok?",
      "Eu sou feito de código, suas palavras não me atingem (mas o servidor pode ficar triste)."
    ]
  },
  {
    id: 'joke',
    keywords: ['piada', 'conta uma', 'rir', 'humor', 'engracada'],
    responses: [
      "Por que o dev não vai à praia? Porque tem medo do Java (Jaca). 🦈",
      "Existem 10 tipos de pessoas: as que sabem binário e as que não.",
      "O que um array falou pro outro? 'Pare de ser tão [0], [1], [2]...'",
      "Toc toc. (Quem é?) Null. (Null quem?) ... *crash no sistema*",
      "Qual a música preferida do SQL? 'Select * from table' (tudão)."
    ]
  },
  {
    id: 'purpose',
    keywords: ['pra que serve', 'objetivo', 'funcao', 'porque existe', 'faz o que'],
    responses: [
      "Meu objetivo é guiar você pelo portfólio e mostrar que o Felipe sabe construir aplicações interativas complexas.",
      "Eu sirvo para tirar dúvidas, explicar projetos e provar que interfaces web podem ser divertidas e inteligentes.",
      "Eu sou o recepcionista digital deste site. Trabalho 24/7 e não peço aumento."
    ]
  }
];

// --- RESPOSTAS PADRÃO (QUANDO NÃO ENTENDE) ---
const FALLBACKS = [
  "Interessante... mas não tenho certeza se entendi. Tente perguntar sobre **Projetos** ou **Tecnologias**.",
  "Humm, meu banco de dados não tem essa resposta específica. Mas aposto que tem a ver com código.",
  "Isso é muito avançado pra minha versão atual (v5.0). Vamos falar do **Market Monitor**?",
  "Não entendi, mas concordo (só pra não criar clima chato). 😅",
  "Você digitou certo? Posso falar sobre o **Felipe**, sobre **React** ou contar uma **piada**.",
  "Estava distraído minerando bitcoin... brincadeira. Pode repetir de outra forma?",
  "404 - Resposta não encontrada. Tente reformular a pergunta."
];

export const AIChatBot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Booting... 🤖 Olá! Sou o Chatbot do Felipe. Sei tudo sobre o portfólio, programação e processo criativo. Pergunte o que quiser!', 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- LÓGICA DE INTELIGÊNCIA (MATCHING) ---
  
  const cleanText = (text: string) => {
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9\s]/g, "");    // Remove pontuação
  };

  const getSmartResponse = (rawInput: string): string => {
    const text = cleanText(rawInput);
    
    // Percorre todo o banco de dados para achar a melhor categoria
    for (const category of KNOWLEDGE_BASE) {
      // Verifica se ALGUMA palavra-chave da entrada está na frase do usuário
      // Usamos .some() para ver se pelo menos uma palavra bate
      const match = category.keywords.some(keyword => text.includes(keyword));
      
      if (match) {
        // Sorteia uma resposta dessa categoria para não ser repetitivo
        const randomIndex = Math.floor(Math.random() * category.responses.length);
        return category.responses[randomIndex];
      }
    }

    // Se não encontrou nada específico, usa o Fallback (Enrolation)
    const randomFallback = Math.floor(Math.random() * FALLBACKS.length);
    return FALLBACKS[randomFallback];
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue(''); 

    // 1. Adiciona msg do usuário
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setIsTyping(true);

    // 2. Delay para simular pensamento e digitação (Realismo)
    // Um delay aleatório entre 600ms e 1400ms deixa a interação mais natural
    const delay = 600 + Math.random() * 800; 

    setTimeout(() => {
      const botResponse = getSmartResponse(userText);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <Overlay>
      <Container>
        <Header>
          <div className="title">
            <span className="dot"></span> 
            <div>
              AI_ASSISTANT <span className="tag">V5.0 ULTIMATE</span>
            </div>
          </div>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <ChatArea>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} $isUser={msg.sender === 'user'}>
              <div className="bubble-content">
                {msg.sender === 'bot' && <BotIcon>🤖</BotIcon>}
                <p>{msg.text}</p>
              </div>
            </MessageBubble>
          ))}
          
          {isTyping && (
            <MessageBubble $isUser={false}>
              <div className="bubble-content">
                <BotIcon>🤖</BotIcon>
                <TypingIndicator>
                  <span>.</span><span>.</span><span>.</span>
                </TypingIndicator>
              </div>
            </MessageBubble>
          )}
          <div ref={messagesEndRef} />
        </ChatArea>

        <InputArea onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Pergunte sobre projetos, stack, Felipe..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          <button type="submit">Enviar</button>
        </InputArea>
      </Container>
    </Overlay>
  );
};

// --- ESTILOS ---

const slideUp = keyframes` from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } `;
const pulse = keyframes` 0% { opacity: 0.5; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { opacity: 1; box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); } 100% { opacity: 0.5; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } `;
const bounce = keyframes` 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } `;

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
  z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 20px;
`;

const Container = styled.div`
  width: 100%; max-width: 500px; height: 80vh; max-height: 700px;
  background: #0f172a; border: 1px solid #334155; border-radius: 16px;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); animation: ${slideUp} 0.3s ease-out;
`;

const Header = styled.div`
  padding: 15px 20px; background: #1e293b; border-bottom: 1px solid #334155;
  display: flex; justify-content: space-between; align-items: center;
  .title { font-family: 'Fira Code', monospace; color: #f8fafc; font-weight: bold; display: flex; align-items: center; gap: 12px; .dot { width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: ${pulse} 2s infinite; } .tag { font-size: 0.6rem; background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 2px 6px; border-radius: 4px; margin-left: 5px;} }
`;

const CloseButton = styled.button`
  background: none; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; &:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); border-radius: 50%; }
`;

const ChatArea = styled.div`
  flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px;
  background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 20px 20px;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  align-self: ${({ $isUser }) => $isUser ? 'flex-end' : 'flex-start'}; max-width: 85%;
  .bubble-content { display: flex; gap: 10px; align-items: flex-end; flex-direction: ${({ $isUser }) => $isUser ? 'row-reverse' : 'row'}; }
  p {
    background: ${({ $isUser }) => $isUser ? '#38bdf8' : '#1e293b'};
    color: ${({ $isUser }) => $isUser ? '#0f172a' : '#e2e8f0'};
    padding: 12px 16px; border-radius: 12px;
    border-bottom-right-radius: ${({ $isUser }) => $isUser ? '2px' : '12px'};
    border-bottom-left-radius: ${({ $isUser }) => $isUser ? '12px' : '2px'};
    font-size: 0.95rem; line-height: 1.5; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border: 1px solid ${({ $isUser }) => $isUser ? '#38bdf8' : '#334155'};
  }
`;

const BotIcon = styled.div`
  min-width: 32px; height: 32px; background: #334155; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 1px solid #475569;
`;

const TypingIndicator = styled.div`
  background: #1e293b; padding: 12px 16px; border-radius: 12px; border-bottom-left-radius: 2px;
  display: flex; gap: 4px; border: 1px solid #334155;
  span {
    width: 6px; height: 6px; background: #94a3b8; border-radius: 50%; animation: ${bounce} 1s infinite;
    &:nth-child(2) { animation-delay: 0.2s; } &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const InputArea = styled.form`
  padding: 15px; background: #1e293b; border-top: 1px solid #334155; display: flex; gap: 10px;
  input {
    flex: 1; padding: 12px 16px; border-radius: 25px; border: 1px solid #334155;
    background: #0f172a; color: white; outline: none; font-family: 'Segoe UI', sans-serif; transition: all 0.3s;
    &:focus { border-color: #38bdf8; box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2); }
  }
  button {
    padding: 0 20px; background: #38bdf8; color: #0f172a; border: none; border-radius: 25px;
    font-weight: bold; cursor: pointer; transition: all 0.3s; text-transform: uppercase; font-size: 0.8rem;
    &:hover { filter: brightness(1.1); transform: translateY(-1px); }
    &:active { transform: translateY(0); }
  }
`;