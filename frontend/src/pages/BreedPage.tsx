import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Species, type Breed } from "../types";
import { API_URL, JSON_HEADERS } from "../config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BreedPage() {

  const navigate = useNavigate();
  const [breed, setBreed] = useState<Breed[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [newBreedName, setNewBreedName] = useState("");
  const [newBreedSpeciesId, setNewBreedSpeciesId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/species`)
      .then(res => { if (!res.ok) return; return res.json(); })
      .then(data => { if (data) setSpecies(data); });

    fetch(`${API_URL}/breeds`)
      .then(res => { if (!res.ok) return; return res.json(); })
      .then(data => { if (data) setBreed(data); });
  }, []);

  function addBreed() {
    fetch(`${API_URL}/breeds`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: newBreedName, speciesId: newBreedSpeciesId })
    })
    .then(res => { if (!res.ok) return; return res.json(); })
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

  function deleteBreed(id: number) {
    fetch(`${API_URL}/breeds/${id}`, { method: "DELETE" })
      .then(res => { if (!res.ok) return; setBreed(breed.filter(b => b.id !== id)); })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Breeds</h1>
        {!showAddForm && <Button onClick={() => setShowAddForm(true)}>Add Breed</Button>}
      </div>

      {showAddForm && (
        <Card className="mb-6 max-w-md">
          <CardHeader><CardTitle>New Breed</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={newBreedName} onChange={(e) => setNewBreedName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Species</Label>
              <Select onValueChange={(value) => setNewBreedSpeciesId(Number(value))}>
                <SelectTrigger><SelectValue placeholder="Select Species" /></SelectTrigger>
                <SelectContent>
                  {species.map(s => (
                    <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={addBreed}>Save</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Species</TableHead>
            <TableHead className="w-24">Animals</TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {breed.map(b => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.name}</TableCell>
              <TableCell>{b.species?.name}</TableCell>
              <TableCell>{b._count.animals}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate(`/breeds/${b.id}`)}>View</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteBreed(b.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
