import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, JSON_HEADERS } from "../config";
import type { Breed } from "../types";

export function BreedProfilePage() {

  const { breedId } = useParams();

  const [breed, setBreed] = useState<Breed | null>(null);

  // Landing page
  useEffect(() => {
    fetch(`${API_URL}/breeds/${breedId}`)
      .then(res => {
        if(!res.ok) return;
        return res.json();
      })
      .then(data => setBreed(data))
  }, []);

  if(!breed) return <div>Loading...</div>

  return (
    <div>
      
      <h1>{breed.name}</h1>
      <span>{breed.active ? "Active" : "Not Active"}</span>

    </div>
  )
}
