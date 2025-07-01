
import { useState } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatInput } from '@/components/ChatInput';
import { SidebarProvider } from '@/components/ui/sidebar';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastActivity: Date;
}

const Index = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Welcome Chat',
      messages: [
        {
          id: '1',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          role: 'assistant',
          timestamp: new Date(),
        },
      ],
      lastActivity: new Date(),
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState('1');
  const [isTyping, setIsTyping] = useState(false);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      lastActivity: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const sendMessage = async (content: string) => {
    if (!currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Update chat with user message
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 0 ? content.slice(0, 30) + '...' : chat.title,
            lastActivity: new Date()
          }
        : chat
    ));

    // Simulate typing
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const responses = [
        "That's an interesting question! Let me think about that...",
        "I'd be happy to help you with that. Here's what I think...",
        "Great question! Based on what you've asked, I would suggest...",
        "I understand what you're looking for. Let me provide some insights...",
        "That's a thoughtful inquiry. Here's my perspective on this topic...",
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: 'assistant',
        timestamp: new Date(),
      };

      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, assistantMessage],
              lastActivity: new Date()
            }
          : chat
      ));
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <ChatSidebar 
          chats={chats}
          currentChatId={currentChatId}
          onChatSelect={setCurrentChatId}
          onNewChat={createNewChat}
        />
        
        <div className="flex flex-col flex-1 min-w-0">
          <ChatHeader currentChat={currentChat} />
          
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatMessages 
              messages={currentChat?.messages || []}
              isTyping={isTyping}
            />
            
            <ChatInput onSendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
