import "@fontsource/ibm-plex-mono";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PokemonVotingDapp } from "./PokemonVotingDapp.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<PokemonVotingDapp />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
);
