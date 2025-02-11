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

function Page() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,  
  } = useForm();

  const handleCreateSubject = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/createSubject", {
        name: data.name,
        code: data.code,
        description: data.description,
      });
      setSubjects([...subjects, response.data]);
      reset(); 
      setLoading(false);
      fetchSubjects()
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const fetchSubjects = async () => {
    const response = await axios.get("http://localhost:8000/getSubjects");
    setSubjects(response.data.subjects);
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <h1>Manage Subjects</h1>
      <div className="flex flex-wrap gap-4">
        {subjects?.map((subject) => (
          <div
            className="border-2 border-gray-300 rounded-md p-4 shadow-md"
            key={subject.id}
          >
            <h2>{subject.name}</h2>
            <p>{subject.description}</p>
            <p>{subject.code}</p>
          </div>
        ))}
      </div>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Subject</CardTitle>
          <CardDescription>Create Subject in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleCreateSubject)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Subject</Label>
                <Input
                  id="name"
                  placeholder="Name of Subject"
                  {...register("name", { required: "Subject is required" })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  placeholder="Code of Subject"
                  {...register("code", {
                    required: "Subject Code is required",
                  })}
                  className={errors.code ? "border-red-500" : ""}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm">{errors.code.message}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button
            type="submit"
            onClick={handleSubmit(handleCreateSubject)}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </CardFooter>
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
