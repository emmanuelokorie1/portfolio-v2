"use client";
import { projects } from "@/data";
import React, { useState } from "react";
import { PinContainer } from "./ui/PinContainer";
import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";

interface projectProps {
  count?: number;
  otherclass?: string;
  titleShow?: boolean;
}

const RecentProjects: React.FC<projectProps> = ({
  count,
  otherclass,
  titleShow,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="" id="projects">
      {titleShow && (
        <h1 className="heading">
          A small selection of{" "}
          <span className="text-purple">recent projects </span>
        </h1>
      )}
      <div
        className={`flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10 ${otherclass}`}
      >
        {projects
          ?.slice(0, count || projects.length)
          ?.map(
            ({ id, title, des, des2, img, iconLists, link, show, video }) => {
              return (
                <div
                  key={id}
                  className="sm:h-[41rem] lg:min-h-[32.5rem] h-[32rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
                >
                  <PinContainer
                    title={
                      show ? link : "Internal product, can't share cendentials"
                    }
                    href={show ? link : "#"}
                  >
                    <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                      <div
                        className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                        style={{ backgroundColor: "#13162D" }}
                      >
                        <Image
                          src="/bg.png"
                          alt="bgimg"
                          layout="fill"
                          objectFit="cover"
                          priority
                        />
                      </div>
                      {!video ? (
                        <Image
                          src={img}
                          alt="cover"
                          layout="intrinsic"
                          width={570}
                          height={240}
                          className="z-10 absolute bottom-0"
                        />
                      ) : (
                        <>
                          {isLoading && (
                            <Image
                              src={img}
                              alt="cover"
                              layout="intrinsic"
                              width={570}
                              height={240}
                              className="z-10 absolute bottom-0"
                            />
                          )}

                          {/* Video Player */}
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={`rounded-lg shadow-lg w-full h-full object-cover ${
                              isLoading ? "hidden" : "block"
                            }`}
                            onCanPlayThrough={() => setIsLoading(false)} // Hides loader when video is ready
                          >
                            <source src={video} type="video/mp4" />
                          </video>
                        </>
                      )}
                    </div>

                    <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                      {title}
                      {des2 && (
                        <span className="italic text-white-100"> - {des2}</span>
                      )}
                    </h1>

                    <p
                      className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                      style={{
                        color: "#BEC1DD",
                        margin: "1vh 0",
                      }}
                    >
                      {des}
                    </p>

                    <div className="flex items-center justify-between mt-7 mb-3">
                      <div className="flex items-center">
                        {iconLists.map((icon, index) => (
                          <div
                            key={index}
                            className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                            style={{
                              transform: `translateX(-${5 * index + 2}px)`,
                            }}
                          >
                            <Image
                              src={icon}
                              alt={`icon-${index}`}
                              width={32}
                              height={32}
                              className="p-2"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center items-center">
                        <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                          Check Live Site
                        </p>
                        <FaLocationArrow className="ms-3" color="#CBACF9" />
                      </div>
                    </div>
                  </PinContainer>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default RecentProjects;
