import { Outlet } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function AppLayout(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}