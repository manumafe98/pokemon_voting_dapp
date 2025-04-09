import "@fontsource/ibm-plex-mono";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PokemonVotingDapp } from "./PokemonVotingDapp.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokemonVotingDapp />
  </StrictMode>,
);
