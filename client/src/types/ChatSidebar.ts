interface ChatTileProps {
    chat: Chat;
    isSelected: boolean;
    currentUserId?: string;
}

interface Chat {
    _id: string;
    participants: Array<any>;
    unreadCount: number;
    lastMessage: {
        sender: string;
        content: string;
        timestamp: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface ChatInterfaceProps {
    selectedChat: Chat;
    onBack: () => void;
    currentUserId?: string;
}

interface Message {
    chat: string;
    sender:  string;
    content: string;
    createdAt: string;
}

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}