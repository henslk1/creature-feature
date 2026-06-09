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

  function generate() {
    fetch(`${API_URL}/animals`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: name, breedId: selectedBreedId })
    })
    .then(res => { if (!res.ok) return; return res.json(); })
    .then(animal => { 
      if (!animal) return;
      if (!selectedBreedId) return; 
      setGenerated(animal); 
      setName("");
      setSelectedBreedId(null);
      setShowAddForm(false);
    })
  }

  return (
    <div>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Generate animal</button>}
      {showAddForm && (
        <div>
          <form>

            <span>Select Breed: </span>
            <select onChange={(e) => setSelectedBreedId(Number(e.target.value))}>
              <option value="">Select Breed</option>
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

      {generated && (
        <div>
          <h2>{generated.name}</h2>

          <h3>Traits</h3>
          {Object.entries(generated.expressedTraits).map(([gene, data]: [string, any]) => (
            <div key={gene}>
              <span>{gene}: {data.expression} ({data.allele1}/{data.allele2})</span>
            </div>
          ))}

          <h3>Stats</h3>
          {Object.entries(generated.stats).map(([key, value]) => (
            <div key={key}><span>{key}: {String(value)}</span></div>
          ))}

          <h3>Attributes</h3>
          {Object.entries(generated.attributes).map(([key, value]) => (
            <div key={key}><span>{key}: {String(value) || <em>User Defined</em>}</span></div>
          ))}
        </div>
      )}

    </div>
  )
}
