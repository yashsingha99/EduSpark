"use client";

import * as React from "react";
import {
  LayoutDashboard,
  BookOpen,
  BookOpenCheck,
  Calendar,
  Users,
  Users2,
  Bot,
  Settings2,
  CalendarCheck2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { CommandMenu } from "./command-menu";
import { studentItems, teacherItems } from "@/lib/menu";
import { Separator } from "./ui/separator";
// Helper to safely retrieve data from localStorage
function getUserData() {
  try {
    const storedData = localStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  } catch {
    return null;
  }
}

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const router = useRouter();
  const userdata = React.useMemo(() => getUserData(), []);
  const { isMobile, open } = useSidebar();

  // Redirect to login if user data is unavailable
  React.useEffect(() => {
    if (!userdata || !userdata.role) {
      router.push("/");
    }
  }, [userdata, router]);

  // Define student and teacher navigation items
  const navigationData = React.useMemo(() => {
    if (!userdata) return null;

    const commonUser = {
      name: `${userdata?.firstName ?? "User"} ${
        userdata?.lastName ?? ""
      }`.trim(),
      email: userdata?.email ?? "unknown@example.com",
      avatar: "/avatars/shadcn.jpg",
    };
    
    if (userdata.role === "student") {
      return { ...studentItems, user: userdata };
    }
    return { ...teacherItems, user: userdata };

  }, [userdata]);

  if (!userdata) return null;

  return (
    <Sidebar className="p-2  " collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center">
        <TeamSwitcher />
      </SidebarHeader>
      {open &&
      <div className=" w-full  items-center  justify-center">
        <CommandMenu />
      </div>}
      {/* <Separator orientation="horizontal" className="mr-2 h-4" /> */}

      <SidebarContent>
        <NavMain items={navigationData?.navMain ?? []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userdata} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export { AppSidebar };
