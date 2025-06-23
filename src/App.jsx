import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="bg-[#f0f4f9] text-[#444746] px-7 py-2">
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 m-4 bg-white min-h-screen rounded-3xl">
            <div className="container mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
