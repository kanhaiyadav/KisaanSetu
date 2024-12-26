import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { HiChevronUpDown } from "react-icons/hi2";
import ProductModalForm from "./ProductModalForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface OptionHeaderProps {
    currSortItem: string;
    setSortItem: (item: string) => void;
    sortItems: string[];
    acending: boolean;
    setAcending: (acending: boolean) => void;
    scrollDivID: string;
}

const OptionHeader = ({
    currSortItem,
    setSortItem,
    sortItems,
    acending,
    setAcending,
    scrollDivID,
}: OptionHeaderProps) => {
    const [open, setOpen] = useState(false);
    const [sortMenu, setSortMenu] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");

    const handleClickOutside = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
            setSortMenu(false);
        }
    };

    useEffect(() => {
        console.log(open);
    }, [open]);

    useEffect(() => {
        // Add event listener to document
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="flex mx-4 gap-4 md:gap-8 items-center pb-4 pt-2">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger onClick={() => setOpen(true)}>
                    <div className="flex hover:bg-primary hover:text-white text-gray-600 gap-1 items-center justify-center px-2 py-0 border-2 hover:border-primary border-gray-600 rounded-lg">
                        <span className="text-xl md:text-3xl ">+</span>
                        <span className="text-md md:text-xl">New</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-[350px] md:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add a new product</DialogTitle>
                        <DialogDescription>
                            Fill in the following details to add a new product
                            to your inventory
                        </DialogDescription>
                    </DialogHeader>
                    <ProductModalForm
                        key="modal" // Optional: Add a unique key if needed
                        product={{
                            _id: "",
                            name: "",
                            price: 0,
                            image: "",
                            priceUnit: "kg",
                            stocksUnit: "kg",
                            stocks: 0,
                            farmer: {
                                _id: "",
                                name: "",
                                avatar: "",
                                email: "",
                            },
                        }}
                        type="create"
                        close={setOpen}
                    />
                </DialogContent>
            </Dialog>
            <div
                className="relative text-md md:text-xl cursor-default text-gray-600 flex md:gap-1 items-center justify-center"
                onClick={(e) => {
                    e.stopPropagation();
                    setSortMenu((prev) => !prev);
                }}
            >
                <span>Sort</span>
                <span>
                    <HiChevronUpDown className="text-md" />
                </span>
                {sortMenu && (
                    <motion.div
                        className={`absolute gap-1 z-20 top-10 left-[-50%] translate-x-[-50%] bg-white 
                        shadow-lg rounded-lg p-2 flex flex-col w-fit`}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        ref={divRef}
                    >
                        {sortItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSortItem(item);
                                    setSortMenu(false);
                                }}
                                className={`text-sm sm:text-md xl:text-md ${
                                    item === currSortItem
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:bg-gray-200"
                                } px-2 py-0 rounded-lg `}
                            >
                                <span className=" whitespace-nowrap font-sans text-md border-b-1 border-gray-200">
                                    {item}
                                </span>
                            </div>
                        ))}
                        <hr className="my-2 border-1 border-gray-600 border-dashed" />
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setAcending(true);
                                setSortMenu(false);
                            }}
                            className={`text-sm sm:text-md xl:text-md ${
                                acending
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-200"
                            } px-2 py-0 rounded-lg `}
                        >
                            <span>Acending</span>
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setAcending(false);
                                setSortMenu(false);
                            }}
                            className={`text-sm sm:text-md xl:text-md ${
                                !acending
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-200"
                            } px-2 py-0 rounded-lg `}
                        >
                            <span>Decending</span>
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="text-md md:text-xl text-gray-600 flex md:gap-1 items-center justify-center">
                <span>View</span>
                <span>
                    <HiChevronUpDown className="text-md" />
                </span>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const allElements: HTMLElement[] = Array.from(
                        document.querySelectorAll("[id]")
                    ) as HTMLElement[]; // Select all elements with an ID
                    const targetElement = allElements.find((el) =>
                        el.id.toLowerCase().includes(input.toLowerCase())
                    );
                    if (targetElement) {
                        targetElement.style.boxShadow =
                            "0px 0px 8px 3px rgba(0,0,0,0.5)";
                        targetElement.style.scale = "1.05";
                        //   targetElement.style.backgroundColor = "#cbd5e0";
                        targetElement.style.transition = "all 1s";
                        setTimeout(() => {
                            //   targetElement.style.backgroundColor = 'white';
                            targetElement.style.boxShadow = "none";
                            targetElement.style.scale = "1";
                        }, 1000);

                        setTimeout(() => {
                            targetElement.style.outline = "none";
                        }, 2000);
                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                    } else {
                        console.log("Element not found");
                    }
                }}
                className="ml-auto   px-1 flex items-center justify-center outline outline-gray-600 focus-within:outline-gray-700 outline-2 rounded-lg"
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="flex-1 text-md md:text-xl w-[100px] md:w-[200px] bg-transparent text-gray-600 px-2 py-1 border-none outline-none"
                />
                <MdOutlineSearch className="text-xl md:text-2xl text-gray-600" />
            </form>
        </div>
    );
};

export default OptionHeader;
