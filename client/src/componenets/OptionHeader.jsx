import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { HiChevronUpDown } from "react-icons/hi2";

const OptionHeader = ({
  onNew,
  currSortItem,
  setSortItem,
  sortItems,
  acending,
  setAcending,
  scrollDivID,
}) => {
  const [sortMenu, setSortMenu] = useState(false);
  const divRef = useRef(null);
  const [input, setInput] = useState("");

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setSortMenu(false);
    }
  };

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
      <button
        onClick={onNew}
        className="flex hover:bg-primary hover:text-white text-gray-600 gap-1 items-center justify-center px-2 py-0 border-2 hover:border-primary border-gray-600 rounded-lg"
      >
        <span className="text-xl md:text-3xl ">+</span>
        <span className="text-md md:text-xl">New</span>
      </button>
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
          const allElements = document.querySelectorAll("[id]"); // Select all elements with an ID
          const targetElement = Array.from(allElements).find((el) =>
            el.id.toLowerCase().includes(input.toLowerCase())
          );
          if (targetElement) {
            targetElement.style.boxShadow = "0px 0px 8px 3px rgba(0,0,0,0.5)";
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
