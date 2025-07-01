
import { Plus, MessageSquare, Settings, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Chat } from '@/pages/Index';
import { formatDistanceToNow } from 'date-fns';

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ chats, currentChatId, onChatSelect, onNewChat }: ChatSidebarProps) {
  return (
    <Sidebar className="w-64 border-r border-gray-200 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Chat
          </h1>
          <SidebarTrigger />
        </div>
        
        <Button 
          onClick={onNewChat}
          className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-2 py-4">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group hover:bg-gray-100 ${
                  currentChatId === chat.id 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className={`w-4 h-4 mt-1 flex-shrink-0 ${
                    currentChatId === chat.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      currentChatId === chat.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {chat.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(chat.lastActivity, { addSuffix: true })}
                    </p>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-100">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
