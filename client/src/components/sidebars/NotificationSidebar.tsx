import { ExpandedContent, ExpansionTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarOverlay, SidebarTrigger } from "@/components/SideBar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { IoMdNotificationsOutline } from "react-icons/io";
import { selectNotificationOpen, selectSidebarExpanded } from "@/redux/sidebar/sidebar.selector";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationOpen, setSidebarExpanded } from "@/redux/sidebar/sidebar.slice";

const NotificationSidebar = () => {

    const open = useSelector(selectNotificationOpen);
    const expanded = useSelector(selectSidebarExpanded);
    const dispatch = useDispatch();

    const setOpen = (open: boolean) => {
        dispatch(setNotificationOpen(open));
    };

    const setExpanded = (expanded: boolean) => {
        dispatch(setSidebarExpanded(expanded));
    };
    
  return (
      <Sidebar open={open} setOpen={setOpen} expanded={expanded} setExpanded={setExpanded}>
          <SidebarTrigger>
              <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                      <div className="relative hidden sm:block">
                          <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0 animate-ping"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0"></div>
                          <IoMdNotificationsOutline className="text-2xl text-gray-700" />
                      </div>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Notification</p>
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

export default NotificationSidebar