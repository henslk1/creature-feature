import { useState } from "react";
import { API_URL, JSON_HEADERS } from "../config";
import { type Attribute } from "../types";

export function useAttributeSection(
  speciesId: number,
  onAttributeAdded: (attr: Attribute) => void,
  onAttributeDeleted: (attrId: number) => void,
  onAttributeUpdated: (attr: Attribute) => void
) {
  // Dynamic display
  const [expandedAttr, setExpandedAttr] = useState<Set<number>>(new Set());
  const [editingAttr, setEditingAttr] = useState<Attribute | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);

  // Defaults
  const ATTR_URL = `${API_URL}/species/${speciesId}/attributes`;

  // Setters
  const [newAttrName, setNewAttrName] = useState("");
  const [newAttrType, setNewAttrType] = useState("");
  const [newAttrMin, setNewAttrMin] = useState(0);
  const [newAttrMax, setNewAttrMax] = useState(0);
  const [newAttrOptions, setNewAttrOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("")
  const [newAttrOptional, setNewAttrOptional] = useState(false);
  const [newAttrMutable, setNewAttrMutable] = useState(false);

  //--functions
  function toggleAttr(id: number) {
    const updated = new Set(expandedAttr);
    if(updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setExpandedAttr(updated);
  }

  function resetForm() {
    setShowAddForm(false);
    setNewAttrName("");
    setNewAttrType("");
    setNewAttrMin(0);
    setNewAttrMax(0);
    setNewAttrOptions([]);
    setNewOption("");
    setNewAttrOptional(false);
    setNewAttrMutable(false);
  }

  function addAttr() {
    const body: any = {
      name: newAttrName,
      type: newAttrType,
      optional: newAttrOptional,
      mutable: newAttrMutable,
    };
    if (newAttrType === "Number") {
      body.min = newAttrMin;
      body.max = newAttrMax;
    };
    if (newAttrType === "Enum") {
      body.options = newAttrOptions;
    };
    fetch(`${ATTR_URL}`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(body)
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(newAttr => {
      if(!newAttr) return;
      onAttributeAdded(newAttr);
      resetForm();
    })
  }

  function saveAttr() {
    const body: any = {
      name: editingAttr?.name,
      type: editingAttr?.type,
      optional: editingAttr?.optional,
      mutable: editingAttr?.mutable,
    };
    if (editingAttr?.type === "Number") {
      body.min = editingAttr.min;
      body.max = editingAttr.max;
    };
    if (editingAttr?.type === "Enum") {
      body.options = editingAttr.options;
    };
    fetch(`${ATTR_URL}/${editingAttr?.id}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify(body)
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(updatedAttr => {
      if(!updatedAttr) return;
      onAttributeUpdated(updatedAttr);
      setEditingAttr(null);
    })
  }

  function deleteAttr(id: number) {
    fetch(`${ATTR_URL}/${id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(!res.ok) return;
      onAttributeDeleted(id);
    })
  }

  return {
    expandedAttr, setExpandedAttr,
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
  }
}
