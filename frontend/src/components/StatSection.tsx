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

export function StatSection({ speciesId, stats, onStatAdded, onStatDeleted, onStatUpdated }) {

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

  }

  // PATCH
  function saveStat() {

  }

  // DELETE
  function deleteStat() {

  }

  return(
    <div>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Stat</button>}
      {showAddForm && (

      )}

      {stats.map(stat => (
        <div key={stat.id}>
          
          {editingStat?.id !== stat.id && (
            <div>

            </div>
          )}

          {editingStat?.id === stat.id && (

          )}

        </div>
      ))}
    </div>
  )
}