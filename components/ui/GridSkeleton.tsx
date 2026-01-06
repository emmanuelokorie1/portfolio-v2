"use client";
import React from "react";
import { cn } from "@/lib/utils";

const SkeletonItem = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none border border-white/[0.1] justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className="flex flex-1 w-full h-full rounded-3xl bg-gradient-to-r from-neutral-200/20 via-neutral-100/10 to-neutral-200/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
};

const GridSkeleton = () => {
  const skeletonItems = [
    {
      id: 1,
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    },
    {
      id: 2,
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    },
    {
      id: 3,
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    },
    {
      id: 4,
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    },
    {
      id: 5,
      className: "md:col-span-3 md:row-span-2",
    },
    {
      id: 6,
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    },
  ];

  return (
    <section id="about" className="py-20">
      <h1 className="heading mb-12 opacity-50">
        Peek into my <span className="text-purple">digital space</span>
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto w-full"
      >
        {skeletonItems.map((item) => (
          <SkeletonItem key={item.id} className={item.className} />
        ))}
      </div>
    </section>
  );
};

export default GridSkeleton;
