import { ExpandedContent, ExpansionTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarOverlay, SidebarTrigger } from "@/components/SideBar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { TbMessageDots } from "react-icons/tb";
import { selectMessageOpen, selectSidebarExpanded } from "@/redux/sidebar/sidebar.selector";
import { useDispatch, useSelector } from "react-redux";
import { setMessageOpen, setSidebarExpanded } from "@/redux/sidebar/sidebar.slice";
import { selectUserInfo } from "@/redux/user/selectors";
import { selectChats, selectSelectedChat, selectUnreadChatsCount } from "@/redux/chat/chat.selector";
import ChatTile from "./ChatTile";
import ChatInterface from "./ChatInterface";
import { useEffect } from "react";
import { setChats } from "@/redux/chat/chat.slice";
import { current } from "@reduxjs/toolkit";

const MessageSidebar: React.FC = () => {
    const open = useSelector(selectMessageOpen);
    const expanded = useSelector(selectSidebarExpanded);
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const chats = useSelector(selectChats);
    console.log("Chats in MessageSidebar:", chats);
    const selectedChat = useSelector(selectSelectedChat);
    const unreadChatsCount = useSelector(selectUnreadChatsCount);

    const handleBackToList = (): void => {
        dispatch(setSidebarExpanded(false));
    };

    useEffect(() => {
        const fetchChats = async () => { 
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${user?._id}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const resJson = await res.json();
            dispatch(setChats(
                {
                    chats: resJson.data,
                    currentUserId: user?._id,
                }
            ));
        };
        fetchChats();
    }, []);

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
                            {unreadChatsCount > 0 &&  (
                                <div className="bg-primary text-white w-5 h-5 rounded-full absolute right-[-8px] top-[-8px] flex items-center justify-center text-xs font-semibold">{unreadChatsCount < 9 ? unreadChatsCount : '9+'}</div>
                            )}
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
                        {chats?.map((chat) => (
                            <ChatTile
                                key={chat._id}
                                chat={chat}
                                isSelected={selectedChat?._id === chat._id}
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