import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimalsPage } from "./pages/AnimalsPage";
import { BreedProfilePage } from "./pages/BreedProfilePage";
import { GeneratePage } from "./pages/GeneratePage";
import { SpeciesPage } from "./pages/SpeciesPage";
import { SpeciesProfilePage } from "./pages/SpeciesProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimalsPage />} />
        <Route path="/breeds/:breedId" element={<BreedProfilePage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/species" element={<SpeciesPage />} />
        <Route path="/species/:speciesId" element={<SpeciesProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
