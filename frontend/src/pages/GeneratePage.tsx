import { useState, useEffect } from "react";
import { type Breed, type Animal } from "../types";
import { API_URL, JSON_HEADERS } from "../config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GeneratePage() {

  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreedId, setSelectedBreedId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState<Animal | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

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
    <div className="container mx-auto p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Generate Animal</h1>
        {!showAddForm && (
          <Button onClick={() => setShowAddForm(true)}>Generate Animal</Button>
        )}
      </div>

      {showAddForm && (
        <Card className="mb-6 max-w-md">
          <CardHeader>
            <CardTitle>New Animal</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <Label>Breed</Label>
              <Select onValueChange={(value) => setSelectedBreedId(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a breed" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map(b => (
                    <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Animal name" />
            </div>

            <div className="flex gap-2">
              <Button type="button" onClick={generate}>Generate</Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>

          </CardContent>
        </Card>
      )}

      {generated && (
        <Card>
          <CardHeader>
            <CardTitle>{generated.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8 items-start">

              <table className="text-sm border-collapse" style={{ alignSelf: "flex-start" }}>
                <caption className="caption-top font-semibold mb-1">Genes</caption>
                <thead>
                  <tr className="border-b">
                    <th className="px-3 py-1 text-left">Trait</th>
                    <th className="px-3 py-1 text-left">Expression</th>
                    <th className="px-3 py-1 text-left">Genotype</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(generated.expressedTraits).map(([gene, data]: [string, any]) => (
                    <tr key={gene} className="border-b last:border-0">
                      <td className="px-3 py-1">{gene}</td>
                      <td className="px-3 py-1">{data.expression}</td>
                      <td className="px-3 py-1">{data.allele1}/{data.allele2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="text-sm border-collapse" style={{ alignSelf: "flex-start" }}>
                <caption className="caption-top font-semibold mb-1">Stats</caption>
                <thead>
                  <tr className="border-b">
                    <th className="px-3 py-1 text-left">Name</th>
                    <th className="px-3 py-1 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(generated.stats).map(([key, value]) => (
                    <tr key={key} className="border-b last:border-0">
                      <td className="px-3 py-1">{key}</td>
                      <td className="px-3 py-1">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="text-sm border-collapse" style={{ alignSelf: "flex-start" }}>
                <caption className="caption-top font-semibold mb-1">Attributes</caption>
                <thead>
                  <tr className="border-b">
                    <th className="px-3 py-1 text-left">Name</th>
                    <th className="px-3 py-1 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(generated.attributes).map(([key, value]) => (
                    <tr key={key} className="border-b last:border-0">
                      <td className="px-3 py-1">{key}</td>
                      <td className="px-3 py-1">{String(value) || <em>User Defined</em>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
