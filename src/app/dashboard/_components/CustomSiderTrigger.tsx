"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function customSiderTrigger({ name }: { name: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default customSiderTrigger;
