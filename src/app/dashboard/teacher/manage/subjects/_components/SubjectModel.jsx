"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";

function SubjectModel() {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/createSubject`, {
        name: data.name,
        code: data.code,
        description: data.description,
      });
      setSubjects([...subjects, response.data]);
      reset();
      setLoading(false);
      fetchSubjects();
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  return (
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
  );
}

export default SubjectModel;
