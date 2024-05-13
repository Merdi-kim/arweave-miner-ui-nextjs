import React from "react";
import { AddMinerModal } from "./modals/AddMiner";

const NoMiner = () => {
  return (
    <div className="h-[calc(100vh-5rem)] w-screen flex items-center justify-center">
      <AddMinerModal />
    </div>
  );
};

export default NoMiner;
