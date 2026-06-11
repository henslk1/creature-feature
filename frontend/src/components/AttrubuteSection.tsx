import { useAttributeSection } from "../hooks/useAttributeSection";
import { type Attribute } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AttributeSectionProps {
  speciesId: number,
  attributes: Attribute[],
  onAttributeAdded: (attr: Attribute) => void,
  onAttributeDeleted: (attrId: number) => void,
  onAttributeUpdated: (attr: Attribute) => void
}

export function AttributeSection({ speciesId, attributes, onAttributeAdded, onAttributeDeleted, onAttributeUpdated }: AttributeSectionProps) {

  const {
    expandedAttr,
    showAddForm, setShowAddForm,
    newAttrType, setNewAttrType,
    newAttrName, setNewAttrName,
    newAttrMin, setNewAttrMin,
    newAttrMax, setNewAttrMax,
    newAttrOptional, setNewAttrOptional,
    newAttrOptions, setNewAttrOptions,
    newOption, setNewOption,
    newAttrMutable, setNewAttrMutable,
    editingAttr, setEditingAttr,
    addAttr, saveAttr, deleteAttr, toggleAttr, resetForm
  } = useAttributeSection(speciesId, onAttributeAdded, onAttributeDeleted, onAttributeUpdated);

  return (
    <div>
      {!showAddForm && (
        <div className="mb-3">
          <Button size="sm" onClick={() => setShowAddForm(true)}>Add Attribute</Button>
        </div>
      )}

      {showAddForm && (
        <Card className="mb-4 max-w-md">
          <CardHeader><CardTitle className="text-base">New Attribute</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">

            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input value={newAttrName} onChange={(e) => setNewAttrName(e.target.value)} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Type</Label>
              <Select value={newAttrType} onValueChange={setNewAttrType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Number">Number</SelectItem>
                  <SelectItem value="String">String</SelectItem>
                  <SelectItem value="Enum">Enum</SelectItem>
                  <SelectItem value="Boolean">Boolean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newAttrType === "Number" && (
              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <Label>Min</Label>
                  <Input className="w-24" value={newAttrMin} type="number" onChange={(e) => setNewAttrMin(Number(e.target.value))} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Max</Label>
                  <Input className="w-24" value={newAttrMax} type="number" onChange={(e) => setNewAttrMax(Number(e.target.value))} />
                </div>
              </div>
            )}

            {newAttrType === "Enum" && (
              <div className="flex flex-col gap-2">
                <Label>Options</Label>
                <div className="flex flex-wrap gap-2">
                  {newAttrOptions.map((opt, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Badge variant="secondary">{opt}</Badge>
                      <button
                        type="button"
                        className="text-xs text-destructive hover:underline"
                        onClick={() => setNewAttrOptions(newAttrOptions.filter((_, i) => i !== index))}
                      >×</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input className="h-8" placeholder="New option" value={newOption} onChange={(e) => setNewOption(e.target.value)} />
                  <Button type="button" size="sm" variant="outline" onClick={() => { setNewAttrOptions([...newAttrOptions, newOption]); setNewOption(""); }}>
                    Add
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox id="new-optional" checked={newAttrOptional} onCheckedChange={(c) => setNewAttrOptional(Boolean(c))} />
                <Label htmlFor="new-optional">Optional</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="new-mutable" checked={newAttrMutable} onCheckedChange={(c) => setNewAttrMutable(Boolean(c))} />
                <Label htmlFor="new-mutable">Mutable</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" size="sm" onClick={addAttr}>Save</Button>
              <Button type="button" size="sm" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>

          </CardContent>
        </Card>
      )}

      <div className="rounded-md border divide-y">
        {attributes.map(attr => (
          <div key={attr.id}>

            {editingAttr?.id !== attr.id && (
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-medium w-40 ${attr.type !== "String" && attr.type !== "Boolean" ? "cursor-pointer hover:underline" : ""}`}
                    onClick={() => attr.type !== "String" && attr.type !== "Boolean" && toggleAttr(attr.id)}
                  >
                    {attr.name}
                    {attr.type !== "String" && attr.type !== "Boolean" && (
                      <span className="ml-1 text-xs text-muted-foreground">{expandedAttr.has(attr.id) ? "▲" : "▼"}</span>
                    )}
                  </span>
                  <Badge variant="outline">{attr.type}</Badge>
                  <Badge variant={attr.mutable ? "default" : "secondary"}>{attr.mutable ? "Mutable" : "Non-Mutable"}</Badge>
                  <Badge variant={attr.optional ? "default" : "secondary"}>{attr.optional ? "Optional" : "Required"}</Badge>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setEditingAttr(attr); }}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); deleteAttr(attr.id); }}>Delete</Button>
                </div>

                {attr.type !== "String" && attr.type !== "Boolean" && expandedAttr.has(attr.id) && (
                  <div className="mt-2 ml-4 text-sm text-muted-foreground">
                    {attr.type === "Number" && <span>Range: {attr.min} – {attr.max}</span>}
                    {attr.type === "Enum" && (
                      <ol className="list-decimal list-inside">
                        {attr.options.map((opt, index) => <li key={index}>{opt}</li>)}
                      </ol>
                    )}
                  </div>
                )}
              </div>
            )}

            {editingAttr?.id === attr.id && (
              <div className="p-3 bg-muted/20 flex flex-col gap-3">

                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Name</Label>
                  <Input className="max-w-xs h-8" value={editingAttr.name} onChange={(e) => setEditingAttr({ ...editingAttr!, name: e.target.value })} />
                </div>

                {editingAttr.type === "Number" && (
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Min</Label>
                      <Input className="w-24 h-8" value={editingAttr.min} type="number" onChange={(e) => setEditingAttr({ ...editingAttr!, min: Number(e.target.value) })} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Max</Label>
                      <Input className="w-24 h-8" value={editingAttr.max} type="number" onChange={(e) => setEditingAttr({ ...editingAttr!, max: Number(e.target.value) })} />
                    </div>
                  </div>
                )}

                {editingAttr.type === "Enum" && (
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs">Options</Label>
                    <div className="flex flex-wrap gap-2">
                      {editingAttr.options.map((opt, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Badge variant="secondary">{opt}</Badge>
                          <button
                            type="button"
                            className="text-xs text-destructive hover:underline"
                            onClick={() => setEditingAttr({ ...editingAttr, options: editingAttr.options.filter((_, i) => i !== index) })}
                          >×</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input className="h-8 max-w-xs" placeholder="New option" value={newOption} onChange={(e) => setNewOption(e.target.value)} />
                      <Button type="button" size="sm" variant="outline" onClick={() => { setEditingAttr({ ...editingAttr, options: [...editingAttr.options, newOption] }); setNewOption(""); }}>
                        Add
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`edit-optional-${attr.id}`} checked={editingAttr.optional} onCheckedChange={(c) => setEditingAttr({ ...editingAttr, optional: Boolean(c) })} />
                    <Label htmlFor={`edit-optional-${attr.id}`} className="text-sm">Optional</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id={`edit-mutable-${attr.id}`} checked={editingAttr.mutable} onCheckedChange={(c) => setEditingAttr({ ...editingAttr, mutable: Boolean(c) })} />
                    <Label htmlFor={`edit-mutable-${attr.id}`} className="text-sm">Mutable</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="button" size="sm" onClick={saveAttr}>Save</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setEditingAttr(null)}>Cancel</Button>
                </div>

              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}
