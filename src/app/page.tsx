'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const goToDashboard = () => {
    router.push('/dashboard')
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
        <div className="max-w-screen-xl mx-auto p-4 h-[60vh]">
          <div className="flex flex-col h-full justify-end items-center">
            <h1 className="text-3xl font-medium mb-2 tracking-wide">Monitor your Arweave Miner Metrics</h1>
            <p className="font-extralight mt-2 tracking-wider">
              Connect to view your stats of your experience mining.
            </p>

            <div className="flex items-center mt-6">
              <button
                type="button"
                onClick={goToDashboard}
                className="text-white px-6 py-3 rounded-md mt-4 bg-[#494949] uppercase w-64 hover:bg-[#494949]/80"
              >
                Connect to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
