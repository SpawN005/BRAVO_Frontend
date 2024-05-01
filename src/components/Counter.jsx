'use client'

import React from "react";
import { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
const Counter = ({ children, ...rest }) => {
  const [viewPortEntered, setViewPortEntered] = useState(false);
  return (
    <CountUp {...rest} start={viewPortEntered ? null : 0}>
      {({ countUpRef }) => {
        return (
          <VisibilitySensor
            active={!viewPortEntered}
            onChange={(isVisible) => {
              if (isVisible) {
                setViewPortEntered(true);
              }
            }}
            delayedCall
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <p ref={countUpRef} className="h1 font-semibold" />
              <p className="  text-xl">{children}</p>
            </div>
          </VisibilitySensor>
        );
      }}
    </CountUp>
  );
};

export default Counter;