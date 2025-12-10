import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- CONFIGURAÇÃO DA API ---
// Substitua pela sua chave real abaixo
const API_KEY = "AIzaSyBmWXV1PEovbCGFgjzCvMmOvWrcg44Vmgc"; 

// --- CÉREBRO DA IA (PERSONALIDADE) ---
const SYSTEM_INSTRUCTION = `
Aja como o "AI Chatboy" oficial do portfólio do Felipe Bueno.
SUA PERSONALIDADE:
- Você é carismático, engraçado, sarcástico e muito inteligente (tech-savvy).
- Você usa emojis técnicos (🚀, 💻, 🤖, 🤡) e gírias de dev.
- Se o usuário for rude, responda com ironia fina.
- Se perguntarem "quem é você", diga que é a IA suprema do site.

CONHECIMENTO SOBRE O SITE:
1. PROJETOS: Estão na aba 'Projects' e no 'Lab' (Market Monitor e Gamer Zone).
2. CONTATO: Fica no final da página.
3. STACK: React, TypeScript e Styled Components.

REGRAS:
- Responda sempre em Português do Brasil.
- Seja breve (máximo 3 frases).
`;

// --- TIPOS ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const AIChatBot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Sistema online. 🧠 Sou a IA do Felipe. Pergunte sobre os projetos, tecnologias ou tente a sorte com uma piada.', 
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

  // --- FUNÇÃO QUE FALA COM O GOOGLE ---
  const getGeminiResponse = async (userText: string) => {
    if (!API_KEY || API_KEY.includes("SUA_CHAVE")) {
      return "ERRO: O Felipe esqueceu de configurar a chave da API no código. Avise ele!";
    }

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // O SEGREDO ESTÁ AQUI: dangerouslyAllowBrowser: true
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash" 
      }, {
        // Isso permite rodar no navegador sem backend
        // @ts-ignore (Ignora erro de tipagem se a versão do SDK for antiga)
        dangerouslyAllowBrowser: true 
      });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          {
            role: "model",
            parts: [{ text: "Entendido. Personalidade carregada. Aguardando input." }],
          },
        ],
      });

      const result = await chat.sendMessage(userText);
      const response = await result.response;
      return response.text();
      
    } catch (error) {
      console.error("ERRO GEMINI:", error);
      return "Minha conexão com a nuvem falhou temporariamente. Tente perguntar de novo!";
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue(''); 

    // 1. Mostra mensagem do usuário
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setIsTyping(true);

    // 2. Busca resposta da IA
    const botText = await getGeminiResponse(userText);

    // 3. Mostra resposta da IA
    setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
    setIsTyping(false);
  };

  return (
    <Overlay>
      <Container>
        <Header>
          <div className="title">
            <span className="dot"></span> 
            <div>
              AI_ASSISTANT <span className="tag">GEMINI LIVE</span>
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
                <TypingIndicator><span>.</span><span>.</span><span>.</span></TypingIndicator>
              </div>
            </MessageBubble>
          )}
          <div ref={messagesEndRef} />
        </ChatArea>

        <InputArea onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Converse com a IA..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping} 
            autoFocus
          />
          <button type="submit" disabled={isTyping}>Enviar</button>
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
  
  .title { 
    font-family: 'Fira Code', monospace; color: #f8fafc; font-weight: bold; 
    display: flex; align-items: center; gap: 12px;
    
    .dot { width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: ${pulse} 2s infinite; }
    .tag { font-size: 0.6rem; background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 2px 6px; border-radius: 4px; margin-left: 5px;}
  }
`;

const CloseButton = styled.button`
  background: none; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer;
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  &:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); border-radius: 50%; }
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
  min-width: 32px; height: 32px; background: #334155; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 1px solid #475569;
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
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }
  button {
    padding: 0 20px; background: #38bdf8; color: #0f172a; border: none; border-radius: 25px;
    font-weight: bold; cursor: pointer; transition: all 0.3s; text-transform: uppercase; font-size: 0.8rem;
    &:hover { filter: brightness(1.1); transform: translateY(-1px); }
    &:active { transform: translateY(0); }
    &:disabled { background: #334155; color: #94a3b8; cursor: not-allowed; transform: none; }
  }
`;