const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
    return (
        <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'} relative`}>
            <div className={`max-w-[70  ] shadow-md px-4 py-2 rounded-2xl ${isOwn
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

export default MessageBubble;