import { useState } from "react";
import Logo from "../../components/Logo";
import NavItem from "../../components/NavItem";
// import CustomButton from "../../components/CustomButton";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { TbShoppingBag } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import successAudio from '/success.mp3';
// import errorAudio from '/error.mp3';
import { toast } from "react-toastify";
import { LuPanelLeftOpen } from "react-icons/lu";
import { LuPanelRightOpen } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";

const Nav = () => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const success = new Audio(successAudio);
    // const error = new Audio(errorAudio);

    return (
      <div
        className={`fixed bottom-0 xs:top-0 left-0 z-50 h-[60px] xs:h-screen ${
          expanded ? "w-full" : "w-full xs:w-fit"
        } ${
          expanded ? "bg-transparent xs:bg-[rgba(0,0,0,0.2)]" : "bg-transparent"
        }`}
        onClick={() => {
          setExpanded(false);
        }}
      >
        <nav
          className={`${
            expanded ? "w-full xs:w-[235px]" : "w-full xs:w-[50px]"
          } h-full
                box-border ${
                  expanded ? "p-0 xs:p-2" : "p-0 xs:px-1 xs:py-2"
                } pt-0 flex-col
                 transition-all duration-300 ease-in-out bg-white rounded-lg
                overflow-hidden shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] flex
                `}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <header className="border-b-[2px] border-dashed border-primary hidden xs:block">
            <Logo expanded={expanded} setExpanded={setExpanded} />
          </header>
          <section className="flex xs:flex-col justify-evenly xs:justify-start gap-5 py-2 xs:py-4 h-full">
            <NavItem
              to={"."}
              onClick={() => {
                setExpanded(false);
              }}
            >
              <MdOutlineDashboard className={`ml-0 xs:ml-[3px]`} />
              {expanded ? (
                <span className={`overflow-hidden whitespace-nowrap`}>
                  Dashboard
                </span>
              ) : null}
              {
                <span
                  className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                >
                  Dashboard
                </span>
              }
            </NavItem>
            <NavItem
              to={"products"}
              onClick={() => {
                setExpanded(false);
              }}
            >
              <MdOutlineInventory2
                className={`ml-0 xs:ml-[3px] text-xl `}
              />
              {expanded ? (
                <span className={`overflow-hidden whitespace-nowrap`}>
                  Inventory
                </span>
              ) : null}
              {
                <span
                  className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                >
                  Products
                </span>
              }
            </NavItem>
            <NavItem
              to={"sales"}
              onClick={() => {
                setExpanded(false);
              }}
            >
              <BsCart4 className={`ml-0 xs:ml-[3px] text-xl`} />
              {expanded ? (
                <span className={`overflow-hidden whitespace-nowrap`}>
                  Sales
                </span>
              ) : null}
              {
                <span
                  className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                >
                  Sales
                </span>
              }
            </NavItem>
            <NavItem
              to={"sales-analytics"}
              onClick={() => {
                setExpanded(false);
              }}
            >
              <IoAnalytics className={`ml-0 xs:ml-[3px]`} />
              {expanded ? (
                <span className={`overflow-hidden whitespace-nowrap`}>
                  Sales Analytics
                </span>
              ) : null}
              {
                <span
                  className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                >
                  Analytics
                </span>
              }
            </NavItem>
            <NavItem
              to={"logout"}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                dispatch({ type: "LOGOUT" });
                toast.success("Logged out successfully");
                navigate("/signin");
                success.play();
              }}
              className={"hidden xs:grid"}
            >
              <LuLogOut className={`ml-0 xs:ml-[3px]`} />
              <span
                className={`${
                  expanded ? "block" : "hidden"
                } overflow-hidden whitespace-nowrap`}
              >
                LogOut
              </span>
            </NavItem>
            <button
              className={`hidden mt-auto w-full h-[45px] p-2 text-gray-600 rounded-md hover:bg-[#efefef] text-xl
                        xs:grid grid-cols-[auto,1fr] items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out active:scale-90
        `}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <LuPanelRightOpen className={`ml-0 xs:ml-[3px]'}`} />
              ) : (
                <LuPanelLeftOpen className={`ml-0 xs:ml-[3px]'}`} />
              )}
              {expanded ? (
                <span
                  className={`overflow-hidden whitespace-nowrap justify-self-start`}
                >
                  Close Sidebar
                </span>
              ) : null}
            </button>
          </section>
        </nav>
      </div>
    );
}

export default Nav;