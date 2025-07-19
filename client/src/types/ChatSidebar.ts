interface ChatTileProps {
    chat: Chat;
    isSelected: boolean;
    currentUserId?: string;
}

interface Chat {
    _id: number;
    participants: Array<any>;
    unreadCount: number;
    createdAt: string;
    updatedAt: string;
}

interface ChatInterfaceProps {
    selectedChat: Chat;
    onBack: () => void;
    currentUserId?: string;
}

interface Message {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
    isSent: boolean;
}

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}