import { useEffect } from "react";
import Router from "./router";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return <Router />;
}

export default App;
