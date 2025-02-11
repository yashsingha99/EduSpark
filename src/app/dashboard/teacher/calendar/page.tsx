"use client";

import PageTitle from "@/components/page-title";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Calendar, dateFnsLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
// import "./styles.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarEvent } from "@/lib/types";
import CustomSiderTrigger from "../../_components/CustomSiderTrigger";
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const handleSelectSlot = async ({ start, end }: { start: Date; end: Date }) => {
    const sections = ["A", "B", "C", "D"];
    let section = prompt(`Select a section (${sections.join(", ")}):`);

    // Validate section input
    while (!sections.includes(section || "")) {
      section = prompt(`Invalid section! Please select from (${sections.join(", ")}):`);
      if (section === null) return; // User canceled
    }

    const title = `Study Section ${section}`;
    setEvents([...events, { title, start, end, section: section! }]);
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      className: cn(
        "border rounded-md px-2 py-1",
        event.section === "A"
          ? "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
          : event.section === "B"
          ? "bg-green-100 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300"
          : event.section === "C"
          ? "bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-300"
          : "bg-red-100 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300"
      ),
    };
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="">
      <CustomSiderTrigger name={"Calendar"} />

      <PageTitle title="Study Calendar" />
      <Card className="w-[calc(100svw-50px)] p-4 md:w-full">
        <ScrollArea>
          <div className="h-[calc(100svh-150px)]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              view={view}
              onView={handleViewChange}
              date={date}
              onNavigate={handleNavigate}
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
              eventPropGetter={eventStyleGetter}
              onSelectSlot={handleSelectSlot}
              selectable
              popup
              className="calendar"
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="">
      <CustomSiderTrigger name={"Calendar"} />

      <PageTitle title="Study Calendar" />
      <Card>
        <div className="h-[calc(100svh-150px)] p-4">
          <Skeleton className="h-full w-full" />
        </div>
      </Card>
    </div>
  );
}
