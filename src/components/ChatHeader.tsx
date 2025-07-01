
import { Bot, User } from 'lucide-react';
import { Chat } from '@/pages/Index';

interface ChatHeaderProps {
  currentChat?: Chat;
}

export function ChatHeader({ currentChat }: ChatHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">
            {currentChat?.title || 'AI Assistant'}
          </h2>
          <p className="text-sm text-gray-500">Online • Ready to help</p>
        </div>
      </div>
    </div>
  );
}
