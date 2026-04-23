import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const AGENT_URL = import.meta.env.VITE_AGENT_URL || 'https://drippy-pasta-amaze.ngrok-free.dev';
const LOGO_SRC = '/dexsport-clone/assets/dexsport-d-logo.svg?v=2';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { url: string; title: string }[];
  time?: string;
}

const QUICK_BUTTONS = [
  { icon: '🎮', text: 'Что такое Dexsport?' },
  { icon: '🚀', text: 'Как начать играть?' },
  { icon: '🎁', text: 'Какие бонусы есть?' },
  { icon: '💳', text: 'Как пополнить счёт?' },
];

function getTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function renderMarkdown(text: string): React.ReactNode {
  // Join split markdown links: ]\n( → ](
  const normalized = text.replace(/\]\s*\n\s*\(/g, '](');
  const lines = normalized.split('\n');
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;
    let key = 0;
    regex.lastIndex = 0;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIdx) parts.push(line.slice(lastIdx, match.index));
      if (match[1] !== undefined) {
        parts.push(<strong key={key++}>{match[1]}</strong>);
      } else if (match[2] && match[3]) {
        parts.push(<a key={key++} href={match[3]} target="_blank" rel="noreferrer" className="dex-inline-link">{match[2]}</a>);
      }
      lastIdx = match.index + match[0].length;
    }
    if (lastIdx < line.length) parts.push(line.slice(lastIdx));
    return (
      <React.Fragment key={lineIdx}>
        {parts.length > 0 ? parts : line}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!mounted) return null;

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const assistantMsg: Message = { role: 'assistant', content: '', time: getTime() };
    setMessages(prev => [...prev, assistantMsg]);

    try {
      const history = messages
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content }));

      const resp = await fetch(`${AGENT_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '1',
        },
        body: JSON.stringify({ message: text, history }),
      });

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = JSON.parse(line.slice(6));
          if (data.token) {
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: updated[updated.length - 1].content + data.token,
              };
              return updated;
            });
          }
          if (data.done && data.sources) {
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                sources: data.sources.filter((s: any) => s.url),
              };
              return updated;
            });
          }
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: 'Ошибка соединения с сервером. Попробуй позже.',
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const isWelcome = messages.length === 0;

  return (
    <>
      {open && (
        <div className="dex-chat-window">
          {/* Header */}
          <div className="dex-chat-header">
            <div className="dex-chat-avatar"><img src={LOGO_SRC} alt="Dexsport" className="dex-avatar-logo" /></div>
            <div>
              <div className="dex-chat-name">Dexsport AI</div>
              <div className="dex-chat-status">
                <span className="dex-status-dot" />
                Онлайн
              </div>
            </div>
            <button className="dex-chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="dex-chat-messages">
            {isWelcome && (
              <div className="dex-welcome">
                <div className="dex-welcome-avatar"><img src={LOGO_SRC} alt="Dexsport" className="dex-welcome-logo" /></div>
                <div className="dex-welcome-title">Привет! 👋</div>
                <div className="dex-welcome-subtitle">
                  Я ваш персональный AI-помощник Dexsport. Отвечу на любой вопрос о платформе, помогу разобраться и дам полезный совет.
                </div>
                <div className="dex-welcome-disclaimer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                  </svg>
                  Ответы AI могут быть неточны
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`dex-msg dex-msg--${msg.role}`}>
                <div className="dex-msg-row">
                  {msg.role === 'assistant' && (
                    <div className="dex-msg-bot-icon"><img src={LOGO_SRC} alt="" className="dex-bot-icon-logo" /></div>
                  )}
                  <div className="dex-msg-bubble">
                    {msg.content ? renderMarkdown(msg.content) : (
                      <span className="dex-typing">
                        <span className="dex-typing-dot" />
                        <span className="dex-typing-dot" />
                        <span className="dex-typing-dot" />
                      </span>
                    )}
                  </div>
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="dex-sources">
                    {msg.sources.map((s, j) => (
                      <a key={j} href={s.url} target="_blank" rel="noreferrer" className="dex-source-link">
                        {s.title || s.url}
                      </a>
                    ))}
                  </div>
                )}
                {msg.time && msg.content && (
                  <div className="dex-msg-time">{msg.time}</div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Buttons */}
          {isWelcome && (
            <div className="dex-quick-btns">
              {QUICK_BUTTONS.map(btn => (
                <button key={btn.text} className="dex-quick-btn" onClick={() => sendMessage(btn.text)}>
                  {btn.icon} {btn.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="dex-chat-input-row">
            <input
              className="dex-chat-input"
              placeholder="Задай вопрос..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              disabled={loading}
            />
            <button
              className="dex-chat-send"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="dex-powered-by">powered by Dexsport AI</div>
        </div>
      )}

      {/* FAB */}
      <button className="dex-chat-fab" onClick={() => setOpen(o => !o)}>
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
          </svg>
        )}
      </button>
    </>
  );
}
