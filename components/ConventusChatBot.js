import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, ExternalLink, Bot, User, Sparkles, Minimize2 } from 'lucide-react';

// Chat requests go through our own server-side proxy (pages/api/chat.js),
// which holds the API key. No secrets are exposed to the client.

const TypewriterEffect = ({ text = '', className = "" }) => {
    const [count, setCount] = useState(0);

    // Reset when the text changes
    useEffect(() => {
        setCount(0);
    }, [text]);

    // Advance one character at a time. Deriving the visible text via slice(0, count)
    // is StrictMode-safe — it can never skip characters or read undefined past the end.
    useEffect(() => {
        if (count >= text.length) return;
        const id = setTimeout(() => setCount((c) => Math.min(c + 1, text.length)), 20);
        return () => clearTimeout(id);
    }, [count, text]);

    return <span className={className}>{text.slice(0, count)}</span>;
};

const ConventusChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [iconSize, setIconSize] = useState(20); // default for small screens

    useEffect(() => {
        const updateSize = () => {
            const isLargeScreen = window.innerWidth >= 1024; // Tailwind 'lg' breakpoint
            setIconSize(isLargeScreen ? 40 : 20);
        };

        updateSize(); // Initial check
        window.addEventListener('resize', updateSize); // Update on resize
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    text: "Hello! I'm the Conventus Club MUN assistant. Ask me about our society, events, committees, or how to contact us.",
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            const userMessage = inputValue.trim();
            setMessages(prev => [...prev, {
                text: userMessage,
                sender: 'user',
                timestamp: new Date()
            }]);
            setInputValue('');
            setIsLoading(true);

            try {
                const response = await getBotResponse(userMessage);
                // Clean the response and ensure it's a valid string
                const cleanResponse = (response || '').toString().trim();
                if (cleanResponse) {
                    setMessages(prev => [...prev, {
                        text: cleanResponse,
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                } else {
                    setMessages(prev => [...prev, {
                        text: "I'm sorry, I didn't receive a proper response. Please try again.",
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                }
            } catch (error) {
                console.error('Error getting bot response:', error);
                setMessages(prev => [...prev, {
                    text: "I'm sorry, I encountered an error. Please try again later.",
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getBotResponse = async (userMessage) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const content = data?.content;
            if (!content || typeof content !== 'string') {
                throw new Error('Invalid response format from API');
            }

            return content.trim();
        } catch (error) {
            console.error('Chat API Error:', error);
            throw error;
        }
    };

    const renderMessage = (message) => {
        const text = message.text || '';
        const eventLink = 'https://conventusmun.com/cmun-connect';
        const contactLink = 'https://conventusmun.com/ContactForm';

        // Clean the text by removing any trailing "undefined" or similar artifacts
        const cleanText = text.replace(/undefined$/, '').trim();

        if (cleanText.includes(eventLink) || cleanText.includes(contactLink)) {
            return (
                <div className="space-y-4">
                    <TypewriterEffect text={cleanText} />
                    <div className="flex flex-wrap gap-3 pt-2">
                        {cleanText.includes(eventLink) && (
                            <a
                                href={eventLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                View CMUN Connect
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                        {cleanText.includes(contactLink) && (
                            <a
                                href={contactLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                            >
                                Contact Us
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                    </div>
                </div>
            );
        }
        return <TypewriterEffect text={cleanText} />;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-inter">
            {/* Chat Window */}
            {isOpen && (
                <div className={`mb-4 bg-white rounded-2xl shadow-1xl border border-gray-200/50 overflow-hidden backdrop-blur-xl transition-all duration-300 ${isMinimized ? 'w-16 h-16' : 'lg:w-[420px] lg:h-[600px] w-[300px] h-[400px] max-h-[80vh]' } flex flex-col animate-in slide-in-from-bottom-4`}>

                    {/* Header */}
                    <div className="bg-primary text-white p-4 relative overflow-hidden">
                        <div className="absolute inset-0"></div>
                        <div className="relative flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold lg:text-xl md:text-lg text-sm tracking-tight">Conventus MUN</h3>
                                
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-red-300"
                                >
                                    <X size={iconSize} />
                                </button>
                            </div>
                        </div>
                        {/* <div className="absolute -bottom-2 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-6 -left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div> */}
                    </div>

                    {/* Messages Container */}
                    {!isMinimized && (
                        <>
                            <div className="flex-grow overflow-y-auto px-2 py-2 space-y-6 bg-paper ">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-50 slide-in-from-bottom-2 duration-500`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start space-x-3 max-w-[85%] group">
                                            {message.sender === 'bot' && (
                                                <div className="w-10 h-10 bg-paper rounded-2xl flex items-center justify-center flex-shrink-0 ring-2 ring-red-100 group-hover:ring-red-200 transition-all duration-200">
                                                    <Bot className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                            <div className="flex flex-col space-y-1 max-w-full">
                                                <div
                                                    className={`px-5 py-4 rounded-2xl shadow-sm transition-all duration-200 ${message.sender === 'user' ? 'bg-primary text-white rounded-br-md' : 'bg-white border border-gray-200/80 text-gray-800 rounded-bl-md hover:border-gray-300/80 hover:' }`}
                                                >
                                                    <div className="leading-relaxed">
                                                        {message.sender === 'bot' ? renderMessage(message) : message.text}
                                                    </div>
                                                </div>
                                                <span className={`text-xs text-gray-400 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${message.sender === 'user' ? 'text-right' : 'text-left' }`}>
                                                    {formatTime(message.timestamp)}
                                                </span>
                                            </div>
                                            {message.sender === 'user' && (
                                                <div className="w-10 h-10 bg-paper rounded-2xl flex items-center justify-center flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all duration-200">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Loading indicator */}
                                {isLoading && (
                                    <div className="flex justify-start animate-in fade-in-50">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-paper rounded-2xl flex items-center justify-center ring-2 ring-red-100">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="bg-white border border-gray-200/80 px-5 py-4 rounded-2xl rounded-bl-md shadow-sm">
                                                <div className="flex space-x-1.5">
                                                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white border-t border-gray-100">
                                <div className="flex items-center space-x-2 bg-gray-50/80 rounded-2xl p-1 border-2 border-gray-200/80 focus-within:border-red-300 focus-within:bg-white focus-within: transition-all duration-200">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                                        placeholder="Type your message here..."
                                        className="flex-grow bg-transparent px-2 py-1 focus:outline-none text-gray-700 placeholder-gray-500 font-medium"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={isLoading || !inputValue.trim()}
                                        className="bg-primary text-white p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 transition-all duration-200"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open the Conventus chat assistant"
                    className="bg-primary text-white p-4 rounded-full ring-1 ring-ink/15 hover:bg-primary-700 active:scale-95 focus-visible:ring-4 focus-visible:ring-ink/15 transition-all duration-300 relative group"
                >
                    <MessageCircle size={26} className="relative z-10" />

                    {/* Tasteful tooltip on hover */}
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                        Chat with us
                    </span>
                </button>
            )}
        </div>
    );
};

export default ConventusChatbot;
