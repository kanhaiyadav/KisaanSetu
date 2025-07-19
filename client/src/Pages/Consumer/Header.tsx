import SearchBar from "./SearchBar";
import Logo from "@/components/Logo";
import { useSelector } from "react-redux";
import { selectUserAvatar, selectUserInfo } from "../../redux/user/selectors";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/user";
import { stringToColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    TooltipProvider,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoginForm } from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import MessageSidebar from "@/components/sidebars/MessageSidebar";
import CartSidebar from "@/components/sidebars/CartSidebar";
import NotificationSidebar from "@/components/sidebars/NotificationSidebar";

const Header = () => {
    const [profile, setProfile] = useState(false);
    const userInfo = useSelector(selectUserInfo);
    const { currentUser } = useAuth();
    const avatar = useSelector(selectUserAvatar)
    const [signin, setSignin] = useState(true);

    return (
        <div className="w-full p-4 gap-4 sm:gap-10 flex justify-between bg-white">
            <div className="hidden lg:block">
                <Logo style={{ height: '45px' }} />
            </div>
            <SearchBar />
            <div className="flex items-center gap-5">
                <TooltipProvider>
                    <CartSidebar />
                    {
                        currentUser &&
                        <MessageSidebar />
                    }
                    {
                        currentUser &&
                        <NotificationSidebar />
                    }
                </TooltipProvider>
                {
                    currentUser ? (

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    {
                                        avatar || currentUser?.photoURL ?
                                            <AvatarImage src={(avatar || currentUser?.photoURL) as string} />
                                            :
                                            <AvatarFallback className="text-white"
                                                style={{
                                                    backgroundColor: stringToColor(currentUser?.email || currentUser?.phoneNumber || currentUser?.displayName || "User"),
                                                    opacity: 0.7
                                                }}
                                            >{getUserInitials(currentUser.displayName ?? "User")}</AvatarFallback>
                                    }
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64" align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="text-base">
                                        Orders
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-base">
                                        Subscriptions
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-base">Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-base">
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                        :
                        (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => setSignin(true)}
                                    >
                                        Sign In
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="p-0 max-w-[450px]">
                                    <VisuallyHidden>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </VisuallyHidden>
                                    {
                                        signin ?
                                            <LoginForm consumer={true} />
                                            :
                                            <RegisterForm consumer={true} />
                                    }
                                    <p className='text-center mt-[-10px] mb-6'>
                                        {
                                            signin ? "Don't have an account? " : "Already have an account? "
                                        }
                                        <span className='text-primary text-base font-semibold cursor-pointer hover:underline hover:underline-offset-2'
                                            onClick={() => setSignin(!signin)}
                                        >
                                            {
                                                signin ? "Sign Up" : "Sign In"
                                            }
                                        </span></p>
                                </DialogContent>
                                <div id="recaptcha-container"></div>
                            </Dialog>
                        )
                }
            </div>

            <style>{`
                .grecaptcha-badge {
                    z-index: 9999 !important;
                }
                
                /* For reCAPTCHA challenge popup */
                iframe[src*="recaptcha"] {
                    z-index: 9999 !important;
                }
                
                /* For reCAPTCHA overlay */
                .grecaptcha-overlay {
                    z-index: 9998 !important;
                }
                
                /* Ensure reCAPTCHA container has proper z-index */
                #recaptcha-container {
                    z-index: 9999 !important;
                    position: relative;
                }
                
                /* Additional fix for reCAPTCHA widget container */
                .grecaptcha-widget {
                    z-index: 9999 !important;
                }
            `}</style>
        </div>
    );
};

export default Header;