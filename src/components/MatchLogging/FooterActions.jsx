import React, { useState, useEffect } from "react";

export default function FooterActions() {
  const [matchPhase, setMatchPhase] = useState("beforeStart");
  const [extraTimeSelected, setExtraTimeSelected] = useState(false);
  const [extraTime, setExtraTime] = useState(0);
  const [selectedExtraTime, setSelectedExtraTime] = useState(0);
  const [playedTime, setPlayedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (matchPhase === "firstHalf" || matchPhase === "secondHalf") {
      interval = setInterval(() => {
        setPlayedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchPhase]);

  const handleMatchAction = (action) => {
    console.log(action); // This will be replaced by the actual service call in the future
    switch (action) {
      case "Start Match":
        setMatchPhase("firstHalf");
        break;
      case "End 1st Half":
        setMatchPhase("halfTime");
        break;
      case "Start 2nd Half":
        setMatchPhase("secondHalf");
        break;
      case "End 2nd Half":
        setMatchPhase("afterSecondHalf");
        break;
      case "End Match":
        setMatchPhase("matchEnded");
        break;
      case "Add Extra Time":
        setExtraTimeSelected(true);
        break;
      case "Penalties":
        setMatchPhase("penalties");
        break;
      default:
        break;
    }
  };

  const buttonColor = (text) => {
    switch (text) {
      case "Start Match":
        return "bg-green-500 hover:bg-green-700";
      case "End 1st Half":
      case "End 2nd Half":
        return "bg-yellow-500 hover:bg-yellow-700";
      case "Start 2nd Half":
        return "bg-green-500 hover:bg-green-500";
      case "End Match":
        return "bg-red-500 hover:bg-red-700";
      case "Add Extra Time":
        return "bg-purple-500 hover:bg-purple-700";
      case "Penalties":
        return "bg-orange-500 hover:bg-orange-700";
      default:
        return "bg-gray-500 hover:bg-gray-700";
    }
  };

  const handleExtraTimeChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    setSelectedExtraTime(
      value === "custom"
        ? prompt("Enter custom extra time (minutes):", "")
        : parseInt(value, 10),
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const renderButton = (text) => (
    <button
      onClick={() => handleMatchAction(text)}
      className={`rounded px-4 py-2 font-bold text-white ${buttonColor(text)}`}
    >
      {text}
    </button>
  );
  const displayMatchTime = () => {
    const minutes = Math.floor(playedTime / 60);
    const seconds = playedTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center gap-12 space-x-2">
      <div>{formatTime(playedTime)}</div>
      {matchPhase === "beforeStart" && renderButton("Start Match")}
      {matchPhase === "firstHalf" && (
        <>
          {renderButton("End 1st Half")}

          <select onChange={handleExtraTimeChange} className="ml-2">
            <option value="0">+0</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="custom">Custom</option>
          </select>
        </>
      )}
      {matchPhase === "halfTime" && <>{renderButton("Start 2nd Half")}</>}
      {matchPhase === "secondHalf" && (
        <>
          {renderButton("End 2nd Half")}

          <select onChange={handleExtraTimeChange} className="ml-2">
            <option value="0">+0</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="custom">Custom</option>
          </select>
        </>
      )}
      {matchPhase === "afterSecondHalf" && (
        <>
          {renderButton("End Match")}
          {renderButton("Penalties")}
        </>
      )}
      {matchPhase === "matchEnded" && <div>Match Ended</div>}
    </div>
  );
}
