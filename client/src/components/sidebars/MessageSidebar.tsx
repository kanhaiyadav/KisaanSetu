import { ExpandedContent, ExpansionTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarOverlay, SidebarTrigger } from "@/components/SideBar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TbMessageDots, TbSend, TbPaperclip, TbMoodSmile, TbPhone, TbVideo, TbDotsVertical, TbArrowLeft } from "react-icons/tb";
import { selectMessageOpen, selectSidebarExpanded } from "@/redux/sidebar/sidebar.selector";
import { useDispatch, useSelector } from "react-redux";
import { setMessageOpen, setSidebarExpanded } from "@/redux/sidebar/sidebar.slice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { stringToColor } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { selectUserInfo } from "@/redux/user/selectors";
import { selectChats, selectSelectedChat } from "@/redux/chat/chat.selector";
import { getUserInitials } from "@/lib/user";

interface Chat {
    _id: number;
    participants: Array<any>;
    unreadCount: number;
    createdAt: string;
    updatedAt: string;
}

interface Message {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
    isSent: boolean;
}

interface ChatTileProps {
    chat: Chat;
    openChat: () => void;
    isSelected: boolean;
    currentUserId?: string;
}

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

interface ChatInterfaceProps {
    selectedChat: Chat;
    onBack: () => void;
    currentUserId?: string;
}

const ChatTile: React.FC<ChatTileProps> = ({ chat, openChat, isSelected, currentUserId }) => {

    const otherParticipant: any = chat.participants.find((p: any) => p._id !== currentUserId);

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
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500`}></div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-900 truncate">{otherParticipant.name}</p>
                    <span className="text-xs text-gray-500">10:30 AM</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{'No messages yet'}</p>
            </div>
        </div>
    );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
    return (
        <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'} relative`}>
            <div className={`max-w-[70%] shadow-md px-4 py-2 rounded-2xl ${isOwn
                ? 'bg-primary text-white rounded-br-md'
                : 'bg-gray-200 text-gray-800 rounded-bl-md'
                }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                    {message.timestamp}
                </p>
            </div>
        </div>
    );
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedChat, onBack, currentUserId }) => {

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
        }
    };

    const otherParticipant: any = selectedChat.participants.find((p: any) => p._id !== currentUserId);

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
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500`}></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{otherParticipant.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{'online'}</p>
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
            >
                <div className="p-4 bg-white/70 pointer-events-none min-h-full">
                    
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
                    >
                        <TbSend className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const MessageSidebar: React.FC = () => {
    const open = useSelector(selectMessageOpen);
    const expanded = useSelector(selectSidebarExpanded);
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const chats = useSelector(selectChats);
    const selectedChat = useSelector(selectSelectedChat);
    console.log("Selected Chat:", selectedChat);

    const handleChatSelect = (chat: Chat): void => {
        dispatch(setSidebarExpanded(true));
    };

    const handleBackToList = (): void => {
        dispatch(setSidebarExpanded(false));
    };

    return (
        <Sidebar open={open}
            setOpen={(open: boolean) => {
                dispatch(setMessageOpen(open));
            }}
            expanded={expanded}
            setExpanded={(expanded: boolean) => {
                dispatch(setSidebarExpanded(expanded));
            }}
        >
            <SidebarTrigger>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <div className="relative hidden sm:block">
                            <div className="bg-primary text-white w-5 h-5 rounded-full absolute right-[-8px] top-[-8px] flex items-center justify-center text-xs font-semibold">6</div>
                            <TbMessageDots className="text-2xl text-gray-700" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Messages</p>
                    </TooltipContent>
                </Tooltip>
            </SidebarTrigger>

            <SidebarOverlay>
                <ExpandedContent>
                    {selectedChat ? (
                        <ChatInterface
                            selectedChat={selectedChat}
                            onBack={handleBackToList}
                            currentUserId={user?._id}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-50">
                            <div className="text-center">
                                <TbMessageDots className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Chat</h3>
                                <p className="text-gray-500">Choose a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </ExpandedContent>
                <SidebarContent>
                    <SidebarHeader title="Messages" />
                    <div className="flex-1 overflow-y-auto thin-scrollbar">
                        {chats.map((chat) => (
                            <ChatTile
                                key={chat._id}
                                chat={chat}
                                isSelected={selectedChat?._id === chat._id}
                                openChat={() => handleChatSelect(chat)}
                                currentUserId={user?._id}
                            />
                        ))}
                    </div>
                </SidebarContent>
            </SidebarOverlay>
        </Sidebar>
    )
}

export default MessageSidebar