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

interface Chat {
    id: number;
    name: string;
    message: string;
    initials: string;
    color: string;
    status: "online" | "offline" | "away";
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
}

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

interface ChatInterfaceProps {
    selectedChat: Chat;
    onBack: () => void;
}

const DummyChats: Chat[] = [
    { id: 1, name: "John Doe", message: "Hey, how are you?", initials: "JD", color: "wellqweriusldj", status: "online" },
    { id: 2, name: "Jane Smith", message: "Are you coming to the party?", initials: "JS", color: "ZSPXDCIVK;KZwer", status: "offline" },
    { id: 3, name: "Alice Johnson", message: "Let's catch up soon!", initials: "AJ", color: "avnao8uidjua", status: "online" },
    { id: 4, name: "Bob Brown", message: "Can you send me the report?", initials: "BB", color: "cxojvo9ivpfasd", status: "away" },
    { id: 5, name: "Charlie White", message: "Did you finish the project?", initials: "CW", color: "enqrgoqeijiaj", status: "online" },
    { id: 6, name: "David Green", message: "What time is the meeting?", initials: "DG", color: "mvoaduxcov;xk", status: "offline" },
    { id: 7, name: "Eva Black", message: "I have a question about the code.", initials: "EB", color: "wermlwegjsdlifgj", status: "online" },
    { id: 8, name: "Frank Blue", message: "Can we reschedule our call?", initials: "FB", color: "enqrgoqeijiaj", status: "away" },
    { id: 9, name: "Grace Yellow", message: "Thanks for your help!", initials: "GY", color: "cxojvo9ivpfasd", status: "online" },
    { id: 10, name: "Hank Purple", message: "Let's meet tomorrow.", initials: "HP", color: "mwmwlertwoekrt;/kw", status: "offline" },
    { id: 11, name: "Ivy Orange", message: "I need your feedback.", initials: "IO", color: "xcopvzuxocjmvmzx", status: "online" },
    { id: 12, name: "Jack Pink", message: "Can you review this document?", initials: "JP", color: "xcpvzoxcivpozxc", status: "away" },
    { id: 13, name: "Kathy Gray", message: "Let's collaborate on this.", initials: "KG", color: "zxcvzoxcuvjozixlcjmv", status: "online" },
    { id: 14, name: "Leo Cyan", message: "I have an idea for the project.", initials: "LC", color: "xcpvzkxcpvkpzxock", status: "offline" },
    { id: 15, name: "Mia Magenta", message: "Can you send me the files?", initials: "MM", color: "abadfgasdgnbdf", status: "online" },
];

const DummyMessages: Record<number, Message[]> = {
    1: [
        { id: 1, sender: "John Doe", message: "Hey, how are you?", timestamp: "10:30 AM", isSent: false },
        { id: 2, sender: "You", message: "I'm doing great! How about you?", timestamp: "10:32 AM", isSent: true },
        { id: 3, sender: "John Doe", message: "Pretty good! Just working on some projects. Want to grab coffee later?", timestamp: "10:35 AM", isSent: false },
        { id: 4, sender: "You", message: "That sounds perfect! What time works for you?", timestamp: "10:37 AM", isSent: true },
        { id: 5, sender: "John Doe", message: "How about 3 PM at the usual place?", timestamp: "10:38 AM", isSent: false },
    ],
    2: [
        { id: 1, sender: "Jane Smith", message: "Are you coming to the party?", timestamp: "2:15 PM", isSent: false },
        { id: 2, sender: "You", message: "Which party are you talking about?", timestamp: "2:20 PM", isSent: true },
        { id: 3, sender: "Jane Smith", message: "Sarah's birthday party this Saturday!", timestamp: "2:22 PM", isSent: false },
        { id: 4, sender: "You", message: "Oh yes! I'll definitely be there. Should I bring anything?", timestamp: "2:25 PM", isSent: true },
    ],
    3: [
        { id: 1, sender: "Alice Johnson", message: "Let's catch up soon!", timestamp: "9:45 AM", isSent: false },
        { id: 2, sender: "You", message: "I'd love to! It's been too long", timestamp: "9:50 AM", isSent: true },
        { id: 3, sender: "Alice Johnson", message: "How about this weekend? We could go for brunch", timestamp: "9:52 AM", isSent: false },
    ]
};

const ChatTile: React.FC<ChatTileProps> = ({ chat, openChat, isSelected }) => {
    const statusColor: Record<Chat["status"], string> = {
        online: "bg-green-500",
        offline: "bg-gray-400",
        away: "bg-yellow-500"
    };

    return (
        <div className={`flex p-3 items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-t-[1px] border-b-[1px] border-primary' : 'border-b border-gray-100'}`}
            onClick={openChat}
        >
            <div className="relative">
                <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-white font-semibold"
                        style={{
                            backgroundColor: stringToColor(chat.color),
                        }}
                    >
                        {chat.initials}
                    </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColor[chat.status]}`}></div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-900 truncate">{chat.name}</p>
                    <span className="text-xs text-gray-500">10:30 AM</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.message}</p>
            </div>
        </div>
    );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
    return (
        <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
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

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedChat, onBack }) => {
    const [newMessage, setNewMessage] = useState<string>("");
    const messages = DummyMessages[selectedChat.id] || [];

    const handleSendMessage = (): void => {
        if (newMessage.trim()) {
            // Here you would typically dispatch to your Redux store
            console.log("Sending message:", newMessage);
            setNewMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const statusColor: Record<Chat["status"], string> = {
        online: "bg-green-500",
        offline: "bg-gray-400",
        away: "bg-yellow-500"
    };

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
                                    backgroundColor: stringToColor(selectedChat.color),
                                }}
                            >
                                {selectedChat.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColor[selectedChat.status]}`}></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{selectedChat.status}</p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={message.isSent}
                    />
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-2 border-gray-300">
                <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon" className="mb-2">
                        <TbPaperclip className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 relative">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
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
                            <TbMoodSmile className="w-5 h-5" />
                        </Button>
                    </div>
                    <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
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
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const open = useSelector(selectMessageOpen);
    const expanded = useSelector(selectSidebarExpanded);
    const dispatch = useDispatch();

    const handleChatSelect = (chat: Chat): void => {
        setSelectedChat(chat);
        dispatch(setSidebarExpanded(true));
    };

    const handleBackToList = (): void => {
        setSelectedChat(null);
        dispatch(setSidebarExpanded(false));
    };

    return (
        <Sidebar open={open}
            setOpen={(open: boolean) => {
                dispatch(setMessageOpen(open));
                if (!open) {
                    setSelectedChat(null);
                }
            }}
            expanded={expanded}
            setExpanded={(expanded: boolean) => {
                dispatch(setSidebarExpanded(expanded));
                if (!expanded) {
                    setSelectedChat(null);
                }
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
                    <div className="flex-1 overflow-y-auto">
                        {DummyChats.map((chat) => (
                            <ChatTile
                                key={chat.id}
                                chat={chat}
                                isSelected={selectedChat?.id === chat.id}
                                openChat={() => handleChatSelect(chat)}
                            />
                        ))}
                    </div>
                </SidebarContent>
            </SidebarOverlay>
        </Sidebar>
    )
}

export default MessageSidebar