import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/moving-border";
import Image from "next/image";
// import { LinkPreview } from "./ui/LinkPreview";

const Experience = () => {
  const getRandomDuration = () => Math.floor(Math.random() * 10000) + 10000;

  return (
    <div className="pb-20 w-full">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={getRandomDuration()}
            borderRadius="1.75rem"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-4">
              <div className="lg:w-32 md:w-20 w-16">
                <Image
                  src={card.thumbnail}
                  alt={`${card.title} thumbnail`}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
              </div>
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  <span>{card.title} </span>
                  {/* <LinkPreview
                    url={card.link}
                    className="text-purple font-bold relative"
                  > */}
                  <span className="text-purple font-bold">{card.locay}</span>
                    
                  {/* </LinkPreview> */}
                </h1>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>

                {/* <div className="flex justify-end mt-[1rem] text-white-200 italic text-[.8rem]">
                  {card?.date}
                </div> */}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
