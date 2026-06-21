import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
