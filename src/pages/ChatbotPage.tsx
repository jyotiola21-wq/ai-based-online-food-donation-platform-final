import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import {
  Bot,
  Send,
  User,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Clock,
  HeartHandshake,
  RotateCcw,
  Info,
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'How do I donate cooked meals safely?',
  'What types of food can NGOs request?',
  'How does the AI freshness estimation work?',
  'What are the volunteer transport guidelines?',
  'Can I cancel an active food donation request?',
];

const SYSTEM_INSTRUCTION = `You are the helpful AI Assistant for the "AI-Based Online Food Donation Platform". 
Your role is to assist food donors, NGOs, and volunteer couriers with:
1. Food safety standards, proper packaging, hygiene, and safe storage temperatures.
2. How the platform workflow works: Donors list available food -> NGOs browse and submit claim requests -> Donors accept -> Volunteers deliver to community kitchens/shelters.
3. Guidelines on acceptable foods (cooked meals, raw grains, packaged groceries, bakery goods, produce).
4. Explaining the AI freshness prediction concepts (shelf-life estimation based on storage type, food category, and cooking timestamp).
5. Tips for NGOs regarding timely pickup and distribution to prevent spoilage.

Keep your responses friendly, concise, practical, and formatted cleanly with bullet points where appropriate.`;

export const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am your FoodShare AI Assistant. I can help answer questions about donating surplus food, shelf-life guidelines, NGO claim procedures, or volunteer delivery logistics. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    // Only scroll within the internal chat messages container, NEVER the whole window
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Don't auto-scroll on initial component mount so the top header is in view
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: text }],
            },
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const replyText = response.text || "I'm here to help with any food donation and distribution questions.";
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot_' + Date.now(),
            sender: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        // Fallback intelligent offline knowledge responses if key is missing in student environment
        const fallbackReply = getIntelligentFallback(text);
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot_' + Date.now(),
            sender: 'assistant',
            text: fallbackReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch {
      // In case of network issue or key error, provide informative structured answer
      const fallbackReply = getIntelligentFallback(text);
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'assistant',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getIntelligentFallback = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('cooked') || q.includes('safe') || q.includes('packag')) {
      return "For cooked meals:\n• Pack in clean, food-grade airtight containers or aluminum foil trays.\n• Keep hot cooked meals held above 60°C (140°F) or rapidly chill below 4°C within 2 hours.\n• Ensure food is marked with exact preparation date and time.";
    }
    if (q.includes('freshness') || q.includes('ai') || q.includes('model') || q.includes('predict')) {
      return "The AI Freshness Predictor evaluates food safety based on three key parameters:\n1. Food Category (Cooked, Bakery, Produce, Packaged)\n2. Storage conditions (Ambient room temp vs. Refrigerated vs. Hot held)\n3. Elapsed time since cooking/prep.\nThis estimates safe distribution windows (typically 4-6 hours for room temperature cooked items).";
    }
    if (q.includes('ngo') || q.includes('request') || q.includes('claim')) {
      return "NGOs can claim food by:\n1. Opening the 'Available Food Donations' tab.\n2. Reviewing the item quantity, expiry, and donor pickup address.\n3. Clicking 'Request Donation' and specifying expected pickup logistics.\n4. Once accepted by the donor, pick up or dispatch volunteers.";
    }
    if (q.includes('volunteer') || q.includes('transport') || q.includes('vehicle')) {
      return "Volunteers can pick up verified parcels using motorcycles, cars, or delivery vans depending on quantity. Recommended: insulated bags for temperature control and clean crates for secure transit.";
    }
    return "Surplus food can be listed under the 'Add Food Donation' tab. Registered NGOs and community volunteers coordinate timely collection to minimize waste and ensure meals reach families safely.";
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'assistant',
        text: "Conversation refreshed. How can I help you with the food donation platform today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                AI Assistant & FAQ Chatbot
              </h1>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Ask questions about food safety guidelines, platform workflow, donation shelf-life, and pickup coordination.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetChat}
            className="flex items-center gap-1.5"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </Button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <Card className="flex flex-col p-0 overflow-hidden min-h-[500px]">
        {/* Chat message stream */}
        <div
          ref={messagesContainerRef}
          className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[420px] bg-slate-50/50"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                    isUser
                      ? 'bg-slate-800 text-white'
                      : 'bg-emerald-600 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] space-y-1 ${isUser ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block p-3.5 rounded-lg text-xs sm:text-sm whitespace-pre-wrap leading-relaxed ${
                      isUser
                        ? 'bg-emerald-700 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg rounded-tl-none shadow-xs text-xs text-slate-500 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>AI Assistant is generating an answer...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 overflow-x-auto flex items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 shrink-0">
            <HelpCircle className="w-3 h-3 text-emerald-600" />
            <span>Suggested:</span>
          </span>
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 whitespace-nowrap transition-colors cursor-pointer text-[11px] disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about food donation, shelf life, or logistics..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              className="flex-1 rounded-md border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
        </div>
      </Card>

      {/* Helpful Guidelines Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Food Hygiene Standards</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            All donated meals must be packaged in clean, food-safe containers and handled with sanitized utensils.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Safe Time Windows</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Cooked meals should ideally be distributed within 4-6 hours unless stored under continuous refrigeration below 4°C.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <HeartHandshake className="w-4 h-4 text-sky-600" />
            <span>NGO Coordination</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Registered NGOs coordinate directly with donors and volunteers to ensure minimal delay from pickup to table.
          </p>
        </div>
      </div>
    </div>
  );
};
