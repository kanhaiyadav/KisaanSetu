const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
    console.log("MessageBubble rendered", message);
    return (
        <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'} relative`}>
            <div className={`max-w-[70  ] shadow-md px-4 py-2 rounded-2xl ${isOwn
                ? 'bg-primary text-white rounded-br-md'
                : 'bg-gray-200 text-gray-800 rounded-bl-md'
                }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </div>
    );
};

export default MessageBubble;