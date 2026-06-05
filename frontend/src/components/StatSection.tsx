import { useState } from "react";
import { API_URL, JSON_HEADERS } from "../config";
import {type Stat } from "../types";

interface StatSectionProps {
  speciesId: number,
  stats: Stat[],
  onStatAdded: (stat: Stat) => void,
  onStatDeleted: (statId: number) => void,
  onStatUpdated: (stat: Stat) => void
}

export function StatSection({ speciesId, stats, onStatAdded, onStatDeleted, onStatUpdated }: StatSectionProps) {

  const STAT_URL = `${API_URL}/species/${speciesId}/stats`;

  // Dynamic Display
  const [editingStat, setEditingStat] = useState<Stat | null>(null);

  // Setters
  const [newStatName, setNewStatName] = useState("");
  const [newStatMin, setNewStatMin] = useState(0);
  const [newStatMax, setNewStatMax] = useState(0);

  // Add Form handler
  const [showAddForm, setShowAddForm] = useState(false);

  // --- functions
  // Display
  function resetForm() {
    setShowAddForm(false);
    setNewStatName("");
    setNewStatMin(0);
    setNewStatMax(0);
  }

  // POST
  function addStat() {
    fetch(`${STAT_URL}`, {
      method:"POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: newStatName,
        min: newStatMin,
        max: newStatMax
      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(newStat => {
      if(!newStat) return;
      onStatAdded(newStat);
      resetForm();
    })
  }

  // PATCH
  function saveStat() {
    fetch(`${STAT_URL}/${editingStat?.id}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: editingStat!.name,
        min: editingStat!.min,
        max: editingStat!.max
      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(updatedStat => {
      if(!updatedStat) return;
      onStatUpdated(updatedStat);
      setEditingStat(null);
    })
  }

  // DELETE
  function deleteStat(id: number) {
    fetch(`${STAT_URL}/${id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(!res.ok) return;
      onStatDeleted(id)
    })
  }

  return(
    <div>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Stat</button>}
      {showAddForm && (
        <div>
          <form>
            <strong>New Stat</strong>

            <br></br>

            <span>Name: </span>
            <input value={newStatName} onChange={(e) => setNewStatName(e.target.value)} />
            
            <br></br>

            <span>Min: </span>
            <input value={newStatMin} type="number" min="0" onChange={(e) => setNewStatMin(Number(e.target.value))} />

            <br></br>    

            <span>Max: </span>
            <input value={newStatMax} type="number" min="0" onChange={(e) => setNewStatMax(Number(e.target.value))} />

            <br></br>

            <button onClick={() => addStat()}>Save</button>
            <button type="button" onClick={resetForm}>Cancel</button>
            
          </form>
        </div>
      )}

      {stats.map(stat => (
        <div key={stat.id}>
          
          {editingStat?.id !== stat.id && (
            <div>
              <h3>{stat.name}</h3>
              <button type="button" onClick={(e) => { e.stopPropagation(); deleteStat(stat.id); }}>DELETE</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); setEditingStat(stat); }}>EDIT</button>

              <br></br>

              <span>Name: {stat.name} | </span>
              <span>Min: {stat.min} | </span>
              <span>Max: {stat.max}</span>

            </div>
          )}

          {editingStat?.id === stat.id && (
            <div>
              <strong>Edit Stat</strong>
              
              <br></br>

              <span>Name: </span>
              <input value={editingStat?.name} onChange={(e) => setEditingStat({ ...editingStat!, name: e.target.value })} />
                  
              <div></div>

              <span>Min: </span>
              <input value={editingStat?.min} type="number" min="0" onChange={(e) => setEditingStat({ ...editingStat!, min: Number(e.target.value) })} />

              <div></div>

              <span>Max: </span>
              <input value={editingStat?.max} type="number" min="0" onChange={(e) => setEditingStat({ ...editingStat!, max: Number(e.target.value) })} />

              <div></div>

              <button onClick={() => saveStat()}>Save</button>
              <button type="button" onClick={() => setEditingStat(null)}>Cancel</button> 
            
            </div>
          )}

        </div>
      ))}
    </div>
  )
}
