import { ExpandedContent, ExpansionTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarOverlay, SidebarTrigger } from "@/components/SideBar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectCartOpen, selectSidebarExpanded } from "@/redux/sidebar/sidebar.selector";
import { setCartOpen, setSidebarExpanded } from "@/redux/sidebar/sidebar.slice";

const CartSidebar = () => {

    const open = useSelector(selectCartOpen);
    const expanded = useSelector(selectSidebarExpanded);
    const dispatch = useDispatch();
    
  return (
      <Sidebar
          open={open}
          setOpen={(open) => {
              dispatch(setCartOpen(open));
          }}
          expanded={expanded}
          setExpanded={(expanded) => {
              dispatch(setSidebarExpanded(expanded));
          }}
      >
          <SidebarTrigger>
              <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                      <div className="relative hidden sm:block">
                          <div className="bg-primary text-white w-4 h-4 rounded-full absolute right-[-12px] top-[1px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-1 text-[10px] font-semibold outline outline-3 outline-white">4</div>
                          <BsCart4 className="text-2xl text-gray-700" />
                      </div>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Cart</p>
                  </TooltipContent>
              </Tooltip>
          </SidebarTrigger>

          <SidebarOverlay>
              <ExpandedContent>
                  <div className="p-4">
                      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
                      <p className="text-gray-600">You have 4 items in your cart.</p>
                      {/* Add more cart details here */}
                  </div>
              </ExpandedContent>
              <SidebarContent>
                  <SidebarHeader title="Cart" />
                  <div className="p-4 space-y-2">
                      <ExpansionTrigger>
                          <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">
                              Dashboard
                          </a>
                      </ExpansionTrigger>
                      <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">
                          Profile
                      </a>
                      <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">
                          Settings
                      </a>
                      <a href="#" className="block p-2 text-gray-700 hover:bg-gray-100 rounded">
                          Help
                      </a>
                  </div>
              </SidebarContent>
          </SidebarOverlay>
      </Sidebar>
  )
}

export default CartSidebar