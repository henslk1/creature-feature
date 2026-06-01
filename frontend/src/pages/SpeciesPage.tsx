import { useState, useEffect } from "react";

interface Species {
  id: number,
  name: string,
  description: string
}

export function SpeciesPage() {

  const API_URL = "http://localhost:3001";

  // GET
  const [species, setSpecies] = useState<Species[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/species`)
        .then(res => res.json())
        .then(data => setSpecies(data))
  }, [])

  return (
    <h1>Species</h1>
  )
}
