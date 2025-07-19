import { selectUserInfo } from "@/redux/user/selectors";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const userData = useSelector(selectUserInfo);
    const [socket, setSocket] = useState<Socket | null>(null);

    
    useEffect(() => {
        const init = () => {
            const newSocket = io("http://localhost:3000");
            setSocket(newSocket);
        }
        if (userData) {
            init();
            return () => {
                if (socket) {
                    socket.disconnect();
                }
            };
        }
    }, [userData]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context.socket;
};