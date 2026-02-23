import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm Mouad's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (overrideText?: string) => {
    const trimmed = (overrideText || input).trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Create a placeholder for the assistant response
    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages
            .filter(m => m.id !== '0')
            .map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        let errorMsg = `Server responded with ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch {}
        throw new Error(errorMsg);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No stream reader');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              fullContent += data.content;
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId ? { ...m, content: fullContent } : m
                )
              );
            }
          } catch {
            // Skip malformed data
          }
        }
      }

      // If streaming completed but produced no content, show fallback
      if (!fullContent) {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: "Sorry, I didn't get a response. Please try again!" }
              : m
          )
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                content: `Sorry, something went wrong: ${errorMessage}. You can still explore the portfolio directly!`,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Quick suggestion buttons
  const suggestions = [
    'What projects has Mouad built?',
    'What technologies does he know?',
    'Tell me about his education',
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-ig-border/50 bg-gradient-to-r from-ig-text to-ig-text-secondary">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">AI Assistant</h3>
                <p className="text-xs text-white/60">Ask about Mouad's work</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map(message => (
              <motion.div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user'
                      ? 'bg-ig-text text-white'
                      : 'bg-ig-bg text-ig-text'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-ig-text text-white rounded-tr-md'
                      : 'bg-ig-bg text-ig-text rounded-tl-md'
                  }`}
                >
                  {message.content || (
                    <motion.span
                      className="inline-flex gap-1"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (only show when there's just the welcome message) */}
          {messages.length === 1 && (
            <div className="px-5 pb-2 flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="px-3 py-1.5 text-xs bg-ig-bg hover:bg-ig-border/50 text-ig-text rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-5 py-4 border-t border-ig-border/50">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about Mouad..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-ig-bg text-sm text-ig-text placeholder:text-ig-text-muted outline-none focus:ring-2 focus:ring-ig-text/20 disabled:opacity-50"
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-ig-text text-white flex items-center justify-center disabled:opacity-30 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatWindow;
