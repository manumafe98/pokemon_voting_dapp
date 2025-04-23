import "@fontsource/ibm-plex-mono";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PokemonVotingDapp } from "./PokemonVotingDapp.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<PokemonVotingDapp />} />
    </Routes>
  </BrowserRouter>,
);
