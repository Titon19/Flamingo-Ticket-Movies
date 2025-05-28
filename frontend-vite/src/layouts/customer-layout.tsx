import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";

const CustomerLayout = () => {
  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <main className="max-w-6xl mx-auto px-3 overflow-hidden">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default CustomerLayout;
