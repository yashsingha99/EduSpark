"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      name: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup >
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu >
        {items?.map((item) => {
          if (item?.items) {
            return (
              <Collapsible
                key={item.name}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-[#363636]" tooltip={item.name}>
                      {item.icon && <item.icon />}
                      <span className="text-sm  font-medium">{item.name}</span>
                      {item.items && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.name}>
                          <SidebarMenuSubButton className="hover:bg-[#363636]" asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }
          return (
            <>
              <SidebarMenuItem key={item?.name}>
                <SidebarMenuButton className="hover:bg-[#363636]" tooltip={item.name}>
                  {item.icon && <item.icon />}
                  <Link href={item?.url}>
                    <span className="text-sm  font-medium">{item.name}</span>
                  </Link>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {item?.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.name}>
                      <SidebarMenuSubButton className="hover:bg-[#363636]" asChild>
                        <Link href={subItem.url}>
                          <span className="text-lg">{subItem.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
