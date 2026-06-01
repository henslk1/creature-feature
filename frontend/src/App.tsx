import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimalsPage } from "./pages/AnimalsPage";
import { BreedProfilePage } from "./pages/BreedProfilePage";
import { GeneratePage } from "./pages/GeneratePage";
import { SpeciesPage } from "./pages/SpeciesPage";
import { SpeciesProfilePage } from "./pages/SpeciesProfilePage";
import { BreedPage } from "./pages/BreedPage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<AnimalsPage />} />
        <Route path="/breeds" element={<BreedPage />} />
        <Route path="/breeds/:breedId" element={<BreedProfilePage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/species" element={<SpeciesPage />} />
        <Route path="/species/:speciesId" element={<SpeciesProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
