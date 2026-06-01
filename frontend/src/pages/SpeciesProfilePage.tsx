import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import type { Species } from "../types";

export function SpeciesProfilePage() {

  const { speciesId } = useParams();

  // GET
  const [species, setSpecies] = useState<Species | null>(null);

  // Landing page
  useEffect(() => {
    fetch(`${API_URL}/species/${speciesId}`)
      .then(res => {
        if(!res.ok) return;
        return res.json();
      })
      .then(data => setSpecies(data))
  }, []);

  if(!species) return <div>Loading...</div>

  return (
    <div>
      <h1>{species.name}</h1>
      <p>{species.description}</p>

      <h2>Attributes</h2>

      <h2>Genes</h2>
      
      <h2>Stats</h2>

      <h2>Breeds</h2>
      
    </div>
  )
}
