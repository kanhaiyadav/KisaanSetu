import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { TbArrowLeft, TbDotsVertical, TbMoodSmile, TbPaperclip, TbPhone, TbSend, TbVideo } from "react-icons/tb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { stringToColor } from "@/lib/utils";
import { getUserInitials } from "@/lib/user";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/contexts/socketContext";
import MessageBubble from "./MessageBubble";
import { useDispatch } from "react-redux";
import { resetChatUnreadCount, updateChatLastMessage } from "@/redux/chat/chat.slice";

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedChat, onBack, currentUserId }) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const dispatch = useDispatch();
    const unreadMessagesCountRef = useRef<number>(0);

    //@ts-ignore
    const [status, setStatus] = useState<string>(selectedChat.status || 'offline');
    const socket = useSocket();
    const [message, setMessage] = useState<string>("");

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
        }
    };

    const otherParticipant: any = selectedChat.participants.find((p: any) => p._id !== currentUserId);

    useEffect(() => {
        if (!socket) return;

        socket.on('new-message', (message: any, callback) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            if (callback) {
                callback({ status: "ok" });
            }
        });

        socket.on('status-update', (data: { status: string }) => {
            if (data && data.status) {
                setStatus(data.status);
            }
        });

        socket.on('isActive', (chatId, callback) => {
            callback({ isActive: chatId === selectedChat._id })
        })
        return () => {
            socket.emit('chat-is-inactive', selectedChat._id);
            socket.off('isActive');
            socket.off('new-message');
        }
    }, [])

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChat?._id) return;
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${selectedChat._id}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const resJson = await res.json();
            setMessages(resJson.data);
        };
        fetchMessages();
    }, [selectedChat._id]);

    useEffect(() => {
        unreadMessagesCountRef.current = selectedChat.unreadCount || 0;
        dispatch(resetChatUnreadCount(selectedChat._id));
    }, []);

    useEffect(() => {
        function scrollToBottom() {
            const div = document.getElementById('message-area');
            if (div) {
                div.scrollTop = div.scrollHeight;
            }
        }
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (!message.trim() || !currentUserId) return;

        // Emit the message to the server
        socket?.emit('send-message', {
            chatId: selectedChat._id,
            message: {
                senderId: currentUserId,
                content: message,
            },
        });

        setMessage("");

        const newMessage: Message = {
            chat: selectedChat._id,
            sender: currentUserId,
            content: message,
            createdAt: new Date().toISOString(),
        };

        setMessages((prevMessages) => [
            ...prevMessages,
            newMessage
        ]);
        dispatch(updateChatLastMessage(newMessage));
    }

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b-2 shadow-xl">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="lg:hidden"
                    >
                        <TbArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="relative">
                        <Avatar className="w-10 h-10">
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
                    <div>
                        <h3 className="font-semibold text-gray-900">{otherParticipant.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{status}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <TbPhone className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Voice Call</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <TbVideo className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Video Call</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <TbDotsVertical className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>More Options</TooltipContent>
                    </Tooltip>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-2 relative thin-scrollbar"
                style={{
                    background: 'url(/bg-patterns/p1.avif)',
                }}
                id="message-area"
            >
                <div className="p-4 bg-white/70 pointer-events-none min-h-full">
                    {
                        messages.slice(0, (-1 * unreadMessagesCountRef.current)).map((message, index) => (
                            <MessageBubble key={index} message={message} isOwn={message.sender === currentUserId} />

                        ))
                    }
                    {unreadMessagesCountRef.current > 0 && (
                        <div className="flex gap-6 items-center justify-center w-full my-4">
                            <hr className="flex-1 border-orange-500" />
                            <div className="text-center text-orange-500 text-sm">
                                {unreadMessagesCountRef.current} unread messages
                            </div>
                            <hr className="flex-1 border-orange-500" />
                        </div>
                    )}
                    {
                        messages.slice((-1 * unreadMessagesCountRef.current)).map((message, index) => (
                            <MessageBubble key={index} message={message} isOwn={message.sender === currentUserId} />
                        ))
                    }
                </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-2 border-gray-300">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="mb-2">
                        <TbPaperclip className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 relative flex items-center">
                        <textarea
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="w-full px-4 py-3 pr-12 border border-gray-300 shadow-sm rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows={1}
                            style={{ minHeight: '44px', maxHeight: '120px' }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 bottom-1"
                        >
                            <TbMoodSmile className="text-xl text-gray-700" />
                        </Button>
                    </div>
                    <Button
                        className="mb-2 bg-primary hover:bg-primary/90 text-white rounded-full w-10 h-10 p-0"
                        onClick={sendMessage}
                    >
                        <TbSend className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;