import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Species, type Breed } from "../types";
import { API_URL, JSON_HEADERS } from "../config";

export function BreedPage() {

  const navigate = useNavigate();

  // GET
  const [breed, setBreed] = useState<Breed[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);

  // POST
  const [newBreedName, setNewBreedName] = useState("");
  const [newBreedSpeciesId, setNewBreedSpeciesId] = useState<number | null>(null);

  // Add breed handler
  const [showAddForm, setShowAddForm] = useState(false);

  // Landing page
  useEffect(() => {
    fetch(`${API_URL}/species`)
      .then(res => { if(!res.ok) return; return res.json(); })
      .then(data => { if (data) setSpecies(data); });

    fetch(`${API_URL}/breeds`)
      .then(res => { if(!res.ok) return; return res.json(); })
      .then(data => { if (data) setBreed(data); });
  }, []);

  // POST
  function addBreed() {
    fetch(`${API_URL}/breeds`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: newBreedName, speciesId: newBreedSpeciesId })
    })
    .then(res => { 
      if(!res.ok) return;
      return res.json();
    })
    .then(newBreed => {
      if (!newBreed) return;
      const matchedSpecies = species.find(s => s.id === newBreedSpeciesId);
      setBreed([...breed, {
        ...newBreed,
        species: matchedSpecies ? { name: matchedSpecies.name } : undefined,
        _count: { animals: 0 }
      }]);
      setShowAddForm(false);
      setNewBreedName("");
      setNewBreedSpeciesId(null);
    })
  }

  // DELETE
  function deleteBreed(id: number) {
    fetch(`${API_URL}/breeds/${id}`, {
      method: "DELETE",
    })
    .then(res => {
      if(!res.ok) return;
      setBreed(breed.filter(b => b.id !==id));
    })
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Species</th>
            <th>Animals</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {breed.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.species?.name}</td>
              <td>{b._count.animals}</td>
              <td>
              <button onClick={() => navigate(`/breeds/${b.id}`)}>View</button>
              <button onClick={() => deleteBreed(b.id)}>Delete</button>
              </td>
           </tr>
         ))}
       </tbody>
      </table>

      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Breed</button>}
      {showAddForm && (
        <div>
          <form>
            <input value={newBreedName} onChange={(e) => setNewBreedName(e.target.value)} />
            <select onChange={(e) => setNewBreedSpeciesId(Number(e.target.value))}>
              <option value="">Select Species</option>
              {species.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <button type="button" onClick={addBreed}>Add new breed</button>
            <button type="button" onClick={() =>setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}
