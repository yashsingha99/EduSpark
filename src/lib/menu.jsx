
import {
  BookOpen,
  BookOpenCheck,
  Bot,
  Calendar,
  CalendarCheck2,
  LayoutDashboard,
  Settings2,
  Users,
  Users2,
} from "lucide-react";
 

export const teacherItems = {
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard/teacher/",
      icon: LayoutDashboard,
      isActive: true,
    },
    { name: "My Lectures", url: "/dashboard/teacher/mylectures", icon: Bot },
    {
      name: "Calendar",
      url: "/dashboard/teacher/calendar",
      icon: CalendarCheck2,
    },
    { name: "Quizzes", url: "/dashboard/teacher/quizzes", icon: BookOpenCheck },
    { name: "Groups", url: "/dashboard/teacher/groups", icon: Users2 },
    {
      name: "Manage",
      url: "/dashboard/teacher/manage",
      icon: Users2,
      items: [
        { name: "Sections", url: "/dashboard/teacher/manage/sections" },
        { name: "Students", url: "/dashboard/teacher/manage/students" },
        { name: "Faculties", url: "/dashboard/teacher/manage/faculties" },
        { name: "Courses", url: "/dashboard/teacher/manage/courses" },
        { name: "Subjects", url: "/dashboard/teacher/manage/subjects" },
        { name: "TimeTable", url: "/dashboard/teacher/manage/timetable" },
      ],
    },
    { name: "Settings", url: "#", icon: Settings2 },
  ],
};

export const studentItems = {
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard/student",
      icon: LayoutDashboard,
      isActive: true,
    },
    { name: "My Classes", url: "/dashboard/student/myclasses", icon: BookOpen },
    {
      name: "My Quizzes",
      url: "/dashboard/student/my_quizzes",
      icon: BookOpenCheck,
    },
    { name: "Calendar", url: "/dashboard/student/calendar", icon: Calendar },
    { name: "Groups", url: "/dashboard/student/groups", icon: Users },
    { name: "AI Helper", url: "#", icon: Bot },
    { name: "Settings", url: "#", icon: Settings2 },
  ],
};
