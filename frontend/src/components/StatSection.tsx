import { useState } from "react";
import { API_URL, JSON_HEADERS } from "../config";
import { type Stat } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatSectionProps {
  speciesId: number,
  stats: Stat[],
  onStatAdded: (stat: Stat) => void,
  onStatDeleted: (statId: number) => void,
  onStatUpdated: (stat: Stat) => void
}

export function StatSection({ speciesId, stats, onStatAdded, onStatDeleted, onStatUpdated }: StatSectionProps) {

  const STAT_URL = `${API_URL}/species/${speciesId}/stats`;

  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [newStatName, setNewStatName] = useState("");
  const [newStatMin, setNewStatMin] = useState(0);
  const [newStatMax, setNewStatMax] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  function resetForm() {
    setShowAddForm(false);
    setNewStatName("");
    setNewStatMin(0);
    setNewStatMax(0);
  }

  function addStat() {
    fetch(STAT_URL, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: newStatName, min: newStatMin, max: newStatMax })
    })
    .then(res => { if(!res.ok) return; return res.json(); })
    .then(newStat => { if(!newStat) return; onStatAdded(newStat); resetForm(); })
  }

  function saveStat() {
    fetch(`${STAT_URL}/${editingStat?.id}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({ name: editingStat!.name, min: editingStat!.min, max: editingStat!.max })
    })
    .then(res => { if(!res.ok) return; return res.json(); })
    .then(updatedStat => { if(!updatedStat) return; onStatUpdated(updatedStat); setEditingStat(null); })
  }

  function deleteStat(id: number) {
    fetch(`${STAT_URL}/${id}`, { method: "DELETE" })
    .then(res => { if(!res.ok) return; onStatDeleted(id); })
  }

  return (
    <div>
      {!showAddForm && (
        <div className="mb-3">
          <Button size="sm" onClick={() => setShowAddForm(true)}>Add Stat</Button>
        </div>
      )}

      {showAddForm && (
        <Card className="mb-4 max-w-md">
          <CardHeader><CardTitle className="text-base">New Stat</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input value={newStatName} onChange={(e) => setNewStatName(e.target.value)} />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <Label>Min</Label>
                <Input className="w-24" value={newStatMin} type="number" min="0" onChange={(e) => setNewStatMin(Number(e.target.value))} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Max</Label>
                <Input className="w-24" value={newStatMax} type="number" min="0" onChange={(e) => setNewStatMax(Number(e.target.value))} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={addStat}>Save</Button>
              <Button size="sm" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-md border divide-y">
        {stats.map(stat => (
          <div key={stat.id} className="p-3">
            {editingStat?.id !== stat.id && (
              <div className="flex items-center gap-4">
                <span className="font-medium w-40">{stat.name}</span>
                <span className="text-sm text-muted-foreground">Min: {stat.min}</span>
                <span className="text-sm text-muted-foreground">Max: {stat.max}</span>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setEditingStat(stat); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); deleteStat(stat.id); }}>Delete</Button>
              </div>
            )}
            {editingStat?.id === stat.id && (
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Name</Label>
                  <Input className="w-36 h-8" value={editingStat.name} onChange={(e) => setEditingStat({ ...editingStat!, name: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Min</Label>
                  <Input className="w-24 h-8" value={editingStat.min} type="number" min="0" onChange={(e) => setEditingStat({ ...editingStat!, min: Number(e.target.value) })} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Max</Label>
                  <Input className="w-24 h-8" value={editingStat.max} type="number" min="0" onChange={(e) => setEditingStat({ ...editingStat!, max: Number(e.target.value) })} />
                </div>
                <div className="flex gap-2 self-end">
                  <Button size="sm" onClick={saveStat}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingStat(null)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
