import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import KelendOffre from "../Kelen_Offre.jsx";
import KelendProProfile from "../Kelen_Pro_Ibrahima.jsx";

function App() {
  const [page, setPage] = useState("offre");
  if (page === "pro") return <KelendProProfile onBack={() => setPage("offre")} />;
  return <KelendOffre onNavigateToPro={() => setPage("pro")} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
