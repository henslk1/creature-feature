import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Species } from "../types";
import { API_URL, JSON_HEADERS } from "../config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function SpeciesPage() {

  const navigate = useNavigate();
  const [species, setSpecies] = useState<Species[]>([]);
  const [newSpeciesName, setNewSpeciesName] = useState("");
  const [newSpeciesDescription, setNewSpeciesDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/species`)
      .then(res => { if (!res.ok) return; return res.json(); })
      .then(data => setSpecies(data))
  }, []);

  function addSpecies() {
    fetch(`${API_URL}/species`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: newSpeciesName, description: newSpeciesDescription })
    })
    .then(res => { if (!res.ok) return; return res.json(); })
    .then(newSpecies => {
      if (!newSpecies) return;
      setSpecies([...species, newSpecies]);
      setShowAddForm(false);
      setNewSpeciesName("");
      setNewSpeciesDescription("");
    })
  }

  function deleteSpecies(id: number) {
    fetch(`${API_URL}/species/${id}`, { method: "DELETE" })
      .then(res => { if (!res.ok) return; setSpecies(species.filter(s => s.id !== id)); })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Species</h1>
        {!showAddForm && <Button onClick={() => setShowAddForm(true)}>Add Species</Button>}
      </div>

      {showAddForm && (
        <Card className="mb-6 max-w-md">
          <CardHeader><CardTitle>New Species</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={newSpeciesName} onChange={(e) => setNewSpeciesName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input value={newSpeciesDescription} onChange={(e) => setNewSpeciesDescription(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button onClick={addSpecies}>Save</Button>
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
            <TableHead>Description</TableHead>
            <TableHead className="w-32"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {species.map(s => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.description}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate(`/species/${s.id}`)}>View</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteSpecies(s.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
