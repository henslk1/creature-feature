import { useState } from "react";
import { API_URL, JSON_HEADERS } from "../config";
import { type Attribute } from "../types";

export function useAttributeSection(
  speciesId: number,
  attributes: Attribute[],
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

  function addAttr() {

  }

  function saveAttr() {

  }

  function deleteAttr(id: number) {

  }

  return {
    showAddForm, setShowAddForm,
    newAttrType, setNewAttrType,
    newAttrName, setNewAttrName,
    newAttrMin, setNewAttrMin,
    newAttrMax, setNewAttrMax,
    newAttrOptional, setNewAttrOptional,
    newAttrOptions, setNewAttrOptions,
    newAttrMutable, setNewAttrMutable,
    editingAttr, setEditingAttr,
    addAttr, saveAttr, deleteAttr, toggleAttr
  }
}