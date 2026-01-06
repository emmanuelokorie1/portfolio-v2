"use client";

import Hero from "@/components/Hero";
import MobileNav from "@/components/MobileNav";
import { useRouter } from "next/navigation";
import MagicButton from "@/components/ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import dynamic from "next/dynamic";

import GridSkeleton from "@/components/ui/GridSkeleton";

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
  loading: () => <GridSkeleton />,
});
const RecentProjects = dynamic(() => import("@/components/RecentProjects"), {
  ssr: false,
});
const Client = dynamic(() => import("@/components/Client"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});
const Approach = dynamic(() => import("@/components/Approach"), { ssr: false });

export default function Home() {
  const router = useRouter();
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <div className="block md:hidden">
          <MobileNav />
        </div>
        <Hero />
        <Grid />
        <RecentProjects count={4} titleShow={true} />
        <div className="flex justify-center mt-10 mb-20">
            <MagicButton
              title="See other projects"
              position="right"
              icon={<FaLocationArrow />}
              handleClick={() => router.push("/projects")}
              disableAnimations={true}
            />
        </div>
        <Client />
        <Experience />
        <Approach />
      </div>
    </main>
  );
}
