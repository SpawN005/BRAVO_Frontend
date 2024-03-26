"use client";
import React from "react";
import Table from "@/components/Tables/TableOne";
const GroupStage = ({ tournamentData }) => {
  return (
    <>
      <Table data={tournamentData.groups[0].teams} />
    </>
  );
};

export default GroupStage;
