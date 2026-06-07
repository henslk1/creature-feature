import { useState } from "react";
import { API_URL, JSON_HEADERS } from "../config";
import { type Breed } from "../types";

interface BreedSectionProps {
  speciesId: number,
  breeds: Breed[],
  onBreedAdded: (breed: Breed) => void,
  onBreedDeleted: (breedId: number) => void,
  onBreedUpdated: (breed: Breed) => void
}

export function BreedSection({ speciesId, breeds, onBreedAdded, onBreedDeleted, onBreedUpdated }: BreedSectionProps) {

  const BREED_URL = `${API_URL}/breeds`;

  // Dynamic Display
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null);

  // Setters
  const [newBreedName, setNewBreedName] = useState("");

  // Add form handler
  const [showAddForm, setShowAddForm] = useState(false);

  // --- functions
  // Display
  function resetform() {
    setShowAddForm(false);
    setNewBreedName("");
  }

  // Post
  function addBreed() {

  }

  // Update
  function saveBreed() {

  }

  // Delete
  function deleteBreed(id: number) {
    
  }

  return (
    <div>
      {!showAddForm &&}
      {showAddForm && (
        <div>

        </div>
      )}

      {breeds.map(breed => (
        <div key={breed.id}>

          {editingBreed?.id !== breed.id && (
            <div>
            
            </div>
          )}

          {editingBreed?.id === breed.id && (
            <div>

            </div>
          )}

        </div>
      ))}
    </div>
  )
}
