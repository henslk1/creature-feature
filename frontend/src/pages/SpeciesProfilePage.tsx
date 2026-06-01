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

}
