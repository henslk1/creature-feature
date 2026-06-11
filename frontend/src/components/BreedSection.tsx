import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, JSON_HEADERS } from "../config";
import { type Breed } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface BreedSectionProps {
  speciesId: number,
  breeds: Breed[],
  onBreedAdded: (breed: Breed) => void,
  onBreedDeleted: (breedId: number) => void,
  onBreedUpdated: (breed: Breed) => void
}

export function BreedSection({ speciesId, breeds, onBreedAdded, onBreedDeleted, onBreedUpdated }: BreedSectionProps) {

  const BREED_URL = `${API_URL}/breeds`;

  const [editingBreed, setEditingBreed] = useState<Breed | null>(null);
  const [newBreedName, setNewBreedName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  function resetForm() {
    setShowAddForm(false);
    setNewBreedName("");
  }

  function addBreed() {
    fetch(BREED_URL, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: newBreedName, speciesId })
    })
    .then(res => { if(!res.ok) return; return res.json(); })
    .then(newBreed => { if(!newBreed) return; onBreedAdded(newBreed); resetForm(); })
  }

  function saveBreed() {
    fetch(`${BREED_URL}/${editingBreed?.id}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: editingBreed?.name, active: editingBreed?.active })
    })
    .then(res => { if(!res.ok) return; return res.json(); })
    .then(updatedBreed => { if(!updatedBreed) return; onBreedUpdated(updatedBreed); setEditingBreed(null); })
  }

  function deleteBreed(id: number) {
    fetch(`${BREED_URL}/${id}`, { method: "DELETE" })
    .then(res => { if(!res.ok) return; onBreedDeleted(id); })
  }

  return (
    <div>
      {!showAddForm && (
        <div className="mb-3">
          <Button size="sm" onClick={() => setShowAddForm(true)}>Add Breed</Button>
        </div>
      )}

      {showAddForm && (
        <Card className="mb-4 max-w-md">
          <CardHeader><CardTitle className="text-base">New Breed</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input value={newBreedName} onChange={(e) => setNewBreedName(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={addBreed}>Save</Button>
              <Button size="sm" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-md border divide-y">
        {breeds.map(breed => (
          <div key={breed.id} className="p-3">
            {editingBreed?.id !== breed.id && (
              <div className="flex items-center gap-4">
                <span className="font-medium w-40">{breed.name}</span>
                <Badge variant={breed.active ? "default" : "secondary"}>
                  {breed.active ? "Active" : "Not Active"}
                </Badge>
                <span className="text-sm text-muted-foreground">{breed._count.animals} animals</span>
                <Link to={`/breeds/${breed.id}`} className="text-sm text-primary underline-offset-4 hover:underline">
                  View Profile
                </Link>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setEditingBreed(breed); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); deleteBreed(breed.id); }}>Delete</Button>
              </div>
            )}
            {editingBreed?.id === breed.id && (
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Name</Label>
                  <Input className="w-40 h-8" value={editingBreed.name} onChange={(e) => setEditingBreed({ ...editingBreed, name: e.target.value })} />
                </div>
                <div className="flex items-center gap-2 self-end pb-1">
                  <Checkbox
                    id={`active-${breed.id}`}
                    checked={editingBreed.active}
                    onCheckedChange={(checked) => setEditingBreed({ ...editingBreed, active: Boolean(checked) })}
                  />
                  <Label htmlFor={`active-${breed.id}`} className="text-sm">Active</Label>
                </div>
                <div className="flex gap-2 self-end">
                  <Button size="sm" onClick={saveBreed}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingBreed(null)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
