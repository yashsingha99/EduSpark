"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "./_components/dataTable";

function Page() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const handleCreateSubject = async (data) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post("http://localhost:8000/createSubject", {
  //       name: data.name,
  //       code: data.code,
  //       description: data.description,
  //     });
  //     setSubjects([...subjects, response.data]);
  //     reset();
  //     setLoading(false);
  //     fetchSubjects();
  //   } catch (error) {
  //     setLoading(false);
  //     alert(error);
  //   }
  // };
  const fetchSubjects = async () => {
    const response = await axios.get("http://localhost:8000/getSubjects");
    console.log(response);
    setSubjects(response.data.subjects);
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <h1>Manage Subjects</h1>
      <Card className="w-[calc(100svw-50px)] p-4 md:w-full rounded-3xl">
            <DataTable data={subjects}/>
      </Card>
    </div>
  );
}

export default Page;

// <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="framework">Framework</Label>
//               <Select>
//                 <SelectTrigger id="framework">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="next">Next.js</SelectItem>
//                   <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                   <SelectItem value="astro">Astro</SelectItem>
//                   <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>