import Image from "next/image";
import React from "react";

const Card = (props: any) => {
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg border border-slate-300 p-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
      <Image
        src={props.img}
        alt="test"
        className="w-full"
        width={80}
        height={80}
      ></Image>

      <h1 className="text-2xl font-bold text-black">{props.title}</h1>
      <p className="text-md text-black">{props.description}</p>
    </div>
  );
};

export default Card;
