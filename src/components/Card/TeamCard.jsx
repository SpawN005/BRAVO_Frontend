import React, { useState } from "react";
import Image from "next/image";

const TeamCard = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    props.onSelect(props.id);
  };

  return (
    <div
      className="my-3 flex h-30 w-1/3 cursor-pointer flex-col items-center space-y-2  font-semibold"
      onClick={handleClick}
    >
      <Image
        src={props.logo}
        alt="test"
        className="rounded-full border"
        width={80}
        height={80}
      />
      <p
        className={
          " transition delay-150 duration-300 ease-in-out " +
          (clicked ? "text-green-300" : "")
        }
      >
        {props.title}
      </p>
    </div>
  );
};

export default TeamCard;
