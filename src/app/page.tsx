"use client"
import { HomeActions } from "@/components/home-actions";
import { Container, Flex, Kbd, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from 'next/link';
import Header from "./_components/Header"
import { useRouter } from "next/navigation";
import "./globals.css"
export default function Home() {
const router = useRouter();

  return (
    <>
    <Header />
    <main className="flex min-h-screen flex-col items-center gap-12 p-10 sm:p-24">
      {/* <button
        onClick={() => router.push('/dashboard')}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Go To Dashboard
      </button> */}

<div
      className="relative h-screen w-full"
      style={{
        // backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center text-black p-10">
        <h1 className="text-6xl font-bold mb-2">Elevate Your Knowledge</h1>
        <h1 className="text-6xl font-bold mb-8">with QuizWiz</h1>
        <h2 className="text-2xl mb-2">
          Challenge yourself with interactive quizzes and engage in friendly
          competition.
        </h2>
        <h2 className="text-10l mb-12">
          Join us for a fun learning experience with friends!
        </h2>
        <div className="space-x-5">
          <Link
            href="/join"
            className="bg-purple-600 hover:bg-white text-white hover:text-purple-500 font-bold py-3 px-8 rounded transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Join the Quiz
          </Link>
        </div>
      </div>
    </div>
        
    </main>
    </>
  );
}

