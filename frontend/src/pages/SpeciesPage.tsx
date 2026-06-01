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

  // Add species handler
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/species`)
        .then(res => res.json())
        .then(data => setSpecies(data))
  }, [])

  return (
    <div>
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

      <button onClick={() => setShowAddForm(true)}>Add Species</button>
      {showAddForm && (
        <div>
          <form>
            <input value={newSpeciesName} onChange={(e) => setNewSpeciesName(e.target.value)} />
            <input value={newSpeciesDescription} onChange={(e) => setNewSpeciesDescription(e.target.value)} />
            <button onClick={addSpecies}>Add new species</button>
            <button onClick={() =>setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}
