import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Species {
  id: number,
  name: string,
  description: string
}

export function SpeciesPage() {

  const API_URL = "http://localhost:3001";
  const navigate = useNavigate();

  // GET
  const [species, setSpecies] = useState<Species[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/species`)
        .then(res => res.json())
        .then(data => setSpecies(data))
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {species.map(s => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.description}</td>
            <td><button onClick={() => navigate(`/species/${s.id}`)}>View</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
