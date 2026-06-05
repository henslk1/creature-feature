import { API_URL } from "../config";
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
  // expanded stats, editing stats

  // Default stat

  // Setters
  // newStat fields

  // Add Form handler

  // --- functions
  // Display

  // POST

  // PATCH

  // DELETE
  
  return(
    <div>

    </div>
  )
}