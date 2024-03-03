import React from "react";
import Card from "@/components/Card";
const Format = ({ onNextStep }: any) => {
  return (
    <div className="flex w-1/2 items-center space-x-10">
      <div className="h-full w-full" onClick={onNextStep}>
        <Card
          title="Group Stage + Knockout"
          img="https://i.pinimg.com/564x/f8/0d/22/f80d22e1a337e1e7cd745c12a2b3426b.jpg"
          description="lorem ipsum is simply dummy text of the pringitn and  "
        />
      </div>
      <div className="h-full w-full" onClick={onNextStep}>
        <Card
          title="League"
          img="https://i.pinimg.com/564x/f8/0d/22/f80d22e1a337e1e7cd745c12a2b3426b.jpg"
          description="lorem ipsum is simply dummy text of the pringitn and typestting iudu"
        />
      </div>
      <div className="h-full w-full" onClick={onNextStep}>
        <Card
          title="Knockout"
          img="https://i.pinimg.com/564x/f8/0d/22/f80d22e1a337e1e7cd745c12a2b3426b.jpg"
          description="lorem ipsum is simply dummy text of the pringitn and typestting iudu"
        />
      </div>
    </div>
  );
};

export default Format;
