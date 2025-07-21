import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSocket } from "@/contexts/socketContext";
import { getUserInitials } from "@/lib/user";
import { stringToColor } from "@/lib/utils";
import { removeUnreadChat, resetChatUnreadCount, setSelectedChat } from "@/redux/chat/chat.slice";
import { setSidebarExpanded } from "@/redux/sidebar/sidebar.slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const ChatTile: React.FC<ChatTileProps> = ({ chat, isSelected, currentUserId }) => {

    const otherParticipant: any = chat.participants.find((p: any) => p._id !== currentUserId);
    const socket = useSocket();
    // const [unreadCount, setUnreadCount] = useState<number>(chat.unreadCount || 0);
    const [status, setStatus] = useState<string>('offline');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        socket.on('status-update', (data: { status: string }) => {
            console.log("Status update received:", data);
            if (data && data.status) {
                setStatus(data.status);
            }
        });

        socket.emit('isOnline', chat._id, (response: any) => {
            console.log("Status update response:", response);
            if (response) {
                setStatus(response.status);
            }
        });

        socket.emit('isActive', chat._id, (response: any) => {
            console.log("Is active response:", response);
            if (response && response.isActive) {
                setStatus('active');
            }
        });

        return () => {
            socket.off('status-update');
            socket.off('isOnline');
            socket.off('isActive');
            socket.emit('chat-is-inactive', chat._id);
        };

    }, []);

    const openChat = () => {
        dispatch(setSelectedChat({ ...chat, status: status }));
        dispatch(setSidebarExpanded(true));
        socket?.emit('chat-is-active', chat._id);
        if (chat.unreadCount > 0 && chat.lastMessage.sender !== currentUserId) {
            socket?.emit('reset-unread-count', chat._id);
        }
        dispatch(removeUnreadChat(chat._id));
    }


    return (
        <div className={`flex p-3 items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-t-[1px] border-b-[1px] border-primary' : 'border-b border-gray-100'}`}
            onClick={openChat}
        >
            <div className="relative">
                <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-white font-semibold"
                        style={{
                            backgroundColor: stringToColor(otherParticipant.email || otherParticipant.phone || otherParticipant.name || "User"),
                        }}
                    >
                        {getUserInitials(otherParticipant.name || otherParticipant.email)}
                    </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${status === 'active' ? 'bg-green-500' : status === 'online' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-900 truncate">{otherParticipant.name}</p>
                    <div>
                        {chat.unreadCount > 0 && chat?.lastMessage?.sender !== currentUserId && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
                                {chat.unreadCount}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate flex-1 min-w-0 overflow-hidden text-ellipsis"><span className="font-semibold">{chat?.lastMessage?.sender === currentUserId ? 'You: ' : ''}</span>{chat?.lastMessage?.content || 'No messages yet'}</p>
                    <span className="text-xs text-gray-500">{new Date(chat?.lastMessage?.timestamp).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    }) || 'Unknown time'}</span>
                </div>
            </div>
        </div>
    );
};

export default ChatTile;