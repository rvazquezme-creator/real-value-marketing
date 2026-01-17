import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import useScrollReveal from "./hooks/useScrollReveal";
import useScrollToTop from "./hooks/useScrollToTop";

const ScrollRevealProvider = ({ children }: { children: React.ReactNode }) => {
  useScrollReveal();
  useScrollToTop();

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollRevealProvider>
        <Navbar />
        <AppRouter />
        <Footer />
      </ScrollRevealProvider>
    </BrowserRouter>
  );
}

export default App;
