import { AppSidebar } from "@/components/app-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";



export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="w-full bg-background">
                    <ScrollArea className="h-full p-4">{children}</ScrollArea>
                </main>

            </SidebarInset>
        </SidebarProvider>
    );
}
