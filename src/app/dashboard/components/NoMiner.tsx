import { AddMinerModal } from "./modals/AddMiner";

const NoMiner = () => {
  return (
    <div className="flex h-[calc(100vh-5rem)] w-screen items-center justify-center">
      <AddMinerModal />
    </div>
  );
};

export default NoMiner;
