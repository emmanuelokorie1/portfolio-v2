"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Navigate to home page
    }, 1000); // Wait for 1 seconds before redirecting

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="flex flex-col items-center  bg-black-100 justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-200">
        Redirecting you to the homepage in a few seconds...
      </p>
    </div>
  );
};

export default NotFound;
