import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Species } from "../types";
import { API_URL, JSON_HEADERS } from "../config";

export function SpeciesPage() {

  const navigate = useNavigate();

  // GET
  const [species, setSpecies] = useState<Species[]>([]);

  // POST
  const [newSpeciesName, setNewSpeciesName] = useState("");
  const [newSpeciesDescription, setNewSpeciesDescription] = useState("");

  // Add species handler
  const [showAddForm, setShowAddForm] = useState(false);

  // Landing page
  useEffect(() => {
    fetch(`${API_URL}/species`)
      .then(res => {
        if(!res.ok) return;
        return res.json();
       })
      .then(data => setSpecies(data))
  }, []);

  // POST
  function addSpecies() {
    fetch(`${API_URL}/species`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: newSpeciesName, description: newSpeciesDescription })
    })
    .then(res => { 
      if(!res.ok) return;
      return res.json();
    })
    .then(newSpecies => {
      if (!newSpecies) return;
      setSpecies([...species, newSpecies]); 
      setShowAddForm(false); 
      setNewSpeciesName(""); 
      setNewSpeciesDescription("");
    })
  }

  // DELETE
  function deleteSpecies(id: number) {
    fetch(`${API_URL}/species/${id}`, {
      method: "DELETE",
    })
    .then(res => {
      if(!res.ok) return;
      setSpecies(species.filter(s => s.id !==id));
    })
  }

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
             <td>
              <button onClick={() => navigate(`/species/${s.id}`)}>View</button>
              <button onClick={() => deleteSpecies(s.id)}>Delete</button>
              </td>
           </tr>
         ))}
       </tbody>
      </table>

      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Species</button>}
      {showAddForm && (
        <div>
          <form>
            <input value={newSpeciesName} onChange={(e) => setNewSpeciesName(e.target.value)} />
            <input value={newSpeciesDescription} onChange={(e) => setNewSpeciesDescription(e.target.value)} />
            <button type="button" onClick={addSpecies}>Add new species</button>
            <button type="button" onClick={() =>setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}
