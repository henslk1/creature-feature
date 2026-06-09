import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Breed, type Animal } from "../types";
import { API_URL, JSON_HEADERS } from "../config";

export function GeneratePage() {

  const navigate = useNavigate();

  // GET
  const [breeds, setBreeds] = useState<Breed[]>([]);

  // SET
  const [selectedBreedId, setSelectedBreedId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState<Animal | null>(null);

  // Generate animal handler
  const [showAddForm, setShowAddForm] = useState(false);

  // Landing page
  useEffect(() => {
    fetch(`${API_URL}/breeds`)
      .then(res => { if(!res.ok) return; return res.json(); })
      .then(data => { if(data) setBreeds(data); });
  }, []);

  return (
    <div>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Breed</button>}
      {showAddForm && (
        <div>
          <form>

            <span>Select Breed: </span>
            <select onChange={(e) => setSelectedBreedId(Number(e.target.value))}>
              {breeds.map (b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            
            <br></br>

            <span>Name: </span>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <button type="button" onClick={generate}>Generate animal</button>
            <button type="button" onClick={() =>setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}
