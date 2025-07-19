import React, { createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { set } from "date-fns";

const SidebarContext = createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
} | undefined>(undefined);

const Portal = ({ children, target = document.body }: {
    children: React.ReactNode;
    target?: HTMLElement;
}) => {
    const [portalRoot] = useState(() => document.createElement('div'));

    useEffect(() => {
        target.appendChild(portalRoot);

        return () => {
            if (target.contains(portalRoot)) {
                target.removeChild(portalRoot);
            }
        };
    }, [target, portalRoot]);
    return createPortal(children, portalRoot);
};

export const Sidebar = ({ children, open, setOpen, expanded, setExpanded }: {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}) => {

    return (
        <SidebarContext.Provider value={{ open, setOpen, expanded, setExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
}

export const SidebarTrigger = ({ children }: {
    children: React.ReactNode;
}) => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("SidebarTrigger must be used within a Sidebar");
    }

    const { open, setOpen } = context;

    return (
        <div
            className="transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Sidebar"
        >
            {children}
        </div>
    );
}

export const ShrinkTrigger = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ children, className, ...props }, ref) => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("ShrinkTrigger must be used within a Sidebar");
    }

    const { setExpanded } = context;

    return (
        <div
            onClick={() => setExpanded(false)}
            className={cn("cursor-pointer", className)}
            {...props}
        >
            {children}
        </div>
    );
})

export const ExpansionTrigger = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ children, className, ...props }) => {
    const context = useContext(SidebarContext);
    return (
        <div
            onClick={() => context?.setExpanded?.(true)}
            className={className}
            {...props}
        >
            {children}
        </div>
    )
})

ExpansionTrigger.displayName = "ExpansionTrigger";

export const SidebarHeader = ({ title }: { title: string }) => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("SidebarHeader must be used within a Sidebar");
    }

    const { setOpen, setExpanded } = context;

    return (
        <header className="flex justify-between items-center px-4 py-2 bg-primary/30 border-b-2 border-primary">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                    setExpanded(false);
                    setOpen(false);
                }}
                aria-label="Close Sidebar"
            >
                <X className="w-5 h-5" />
            </Button>
        </header>
    );
}

export const SidebarOverlay = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("SidebarContent must be used within a Sidebar");
    }

    const { open, setOpen } = context;

    return (
        <Portal>
            {/** Backdrop */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/20 z-40"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className="flex fixed top-0 right-0 h-full z-50">
                            {children}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export const SidebarContent = ({ children }: { children: React.ReactNode }) => {

    return (
        <motion.div
            className="bg-white border-l-[3px] border-primary w-[350px] z-[100] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%', transition: { duration: 0.2 } }}
            transition={{ type: 'just', duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}

export const ExpandedContent = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("ExpandedContent must be used within a Sidebar");
    }

    const { expanded } = context;

    if (!expanded) return null;
    
    return (
        <motion.div
            className="bg-white border-r-2 border-primary w-[700px] h-full"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%', transition: { duration: 0.2 } }}
            transition={{ type: 'just', duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}