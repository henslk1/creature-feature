import { useState, useEffect } from "react";
import { type Animal, type Breed } from "../types";
import { API_URL } from "../config";

export function AnimalsPage() {

  const [animals, setAnimals] = useState<Animal | null>(null);
  const [expandedAnimal, setExpandedAnimal] = useState<Set<number>>(new Set());

  // Landing Page
  useEffect(() => {
    fetch(`${API_URL}/animals`)
      .then(res => { if(!res.ok) return; return res.json(); })
      .then(data => { if (data) setAnimals(data); });
  }, []);

  // Toggle
  function toggleAnimal(id: number) {
    const updated = new Set(expandedAnimal);
    if(updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setExpandedAnimal(updated);
  }
  
  return (
    <div>Animals</div>
  )
}
