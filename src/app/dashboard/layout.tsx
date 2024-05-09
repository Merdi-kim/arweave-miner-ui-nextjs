'use client'

import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/app/dashboard/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()

  return (
    <div>
      <Navbar />
      <div>
        <QueryClientProvider client={queryClient}><RecoilRoot>{children}</RecoilRoot></QueryClientProvider>
        
      </div>
    </div>
  );
}
