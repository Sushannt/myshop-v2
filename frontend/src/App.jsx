import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="relative bg-neutral-100">
      <Header />
      <main className="min-h-[88vh] bg-onyx-600 mt-[8vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
