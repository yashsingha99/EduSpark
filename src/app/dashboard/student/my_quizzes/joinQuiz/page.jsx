"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation" 
import { QuizDetails } from "../../../../../API_FROM_EXPRESS/Quiz";
import INVALID_CODE from "../../../../../Assets/Bad idea-rafiki.svg";
import QuizBoard from "../_components/QuizBoard";

function FullScreenApp() {
  let user =JSON.parse( localStorage.getItem("user"));
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isValidCode, setIsValidCode] = useState(false);
  const [quiz, setQuiz] = useState();
  const [isClient, setIsClient] = useState(false); // Track if it's running on the client
  const router = useRouter();
  const searchParams = useSearchParams()

  const code = searchParams.get("code")

  // Set isClient flag after the component has mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch user from localStorage only on the client-side
  // useEffect(() => {
  //   if (isClient) {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   }
  // }, [isClient]);

  // Full-screen request function
  const enterFullScreen = () => {
    const elem = document.documentElement;
    const request =
      elem.requestFullscreen ||
      elem.mozRequestFullScreen ||
      elem.webkitRequestFullscreen ||
      elem.msRequestFullscreen;

    if (request) {
      request
        .call(elem)
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error("Error enabling fullscreen:", err));
    }
  };

  // Handle fullscreen change event
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  // Fetch quiz details when code changes and ensure it's on the client-side
  useEffect(() => {
    if (isClient && code) {
      const getQuizDetails = async () => {
        let res = await QuizDetails({ Code: code });
        if (res?.status === 200) {
          setQuiz(res.data);
          setIsValidCode(true);
        }
      };
      getQuizDetails();
    }
  }, [code, isClient]);

  // Redirect if user is not found
  useEffect(() => {
    if (isClient && !user) {
      router.push("/auth/student");  // Redirect to login if no user
    }
  }, [user, isClient, router]);

  if (!user) return null; // Render nothing if the user is not logged in

  return (
    <div className="h-screen">
      {isFullScreen ? (
        <div>
          {isValidCode ? (
            <div className="h-screen bg-blue-950 overflow-hidden">
              <QuizBoard quiz={quiz}></QuizBoard>
            </div>
          ) : (
            <div className="w-full h-screen flex justify-center items-center flex-col bg-blue-50">
              <img src={INVALID_CODE} className="w-1/3" alt="Invalid Code" />
              <h1 className="text-4xl text-purple-950 font-bold">
                Contest with this code does not exist.
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center bg-blue-50">
          <div className="bg-white w-1/2 p-20 pb-10 flex flex-col items-center justify-center shadow-lg rounded-lg border-4">
            <h1 className="text-xl text-center font-semibold text-blue-950">
              To maintain the integrity of the quiz and prevent cheating, please
              enter full-screen mode by clicking the button below. This will
              ensure a focused environment without distractions.
            </h1>
            <button
              onClick={enterFullScreen}
              className="bg-blue-900 hover:bg-blue-950 duration-300 border-blue-200 border-4 rounded-lg text-white p-3 w-40 font-rubik font-semibold m-10"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FullScreenApp;
