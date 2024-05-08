import { Dispatch, SetStateAction } from "react";

interface AddMinerModalProps {
  HandleCloseModal: Dispatch<SetStateAction<boolean>>;
}

export const AddMinerModal = ({ HandleCloseModal }: AddMinerModalProps) => {
  return (
    <div className="fixed inset-0  bg-gray-600/50 overflow-y-auto w-full">
      <div className="relative top-40 mx-auto p-7 border shadow-lg rounded-md bg-white w-10/12 sm:w-[32rem]">
        <div className="mx-auto flex flex-col items-center justify-center w-full sm:w-96">
          <div className="w-full">
            <input
              type="text"
              className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
              placeholder="Give your miner a name"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
              placeholder="Enter Miner Hostname"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
              placeholder="Enter Miner Port Number"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
              placeholder="Enter Miner Protocol"
            />
          </div>
          <div>
            <button
              className="px-4 py-2 mr-6 text-black rounded-md hover:bg-gray-100 hover:border-black border-2"
              onClick={() => HandleCloseModal(false)}
            >
              Close
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:text-green-300 hover:border-green-300 border-2">
              Add Miner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
