import { useAttributeSection } from "../hooks/useAttributeSection";
import { type Attribute } from "../types";

interface AttributeSectionProps {
  speciesId: number,
  attributes: Attribute[],
  onAttributeAdded: (attr: Attribute) => void,
  onAttributeDeleted: (attrId: number) => void,
  onAttributeUpdated: (attr: Attribute) => void
}

export function AttributeSection({ speciesId, attributes, onAttributeAdded, onAttributeDeleted, onAttributeUpdated }: AttributeSectionProps) {

  const {
    showAddForm, setShowAddForm,
    newAttrType, setNewAttrType,
    newAttrName, setNewAttrName,
    newAttrMin, setNewAttrMin,
    newAttrMax, setNewAttrMax,
    newAttrOptional, setNewAttrOptional,
    newAttrOptions, setNewAttrOptions,
    newAttrMutable, setNewAttrMutable,
    editingAttr, setEditingAttr,
    addAttr, saveAttr, deleteAttr, toggleAttr } = useAttributeSection(speciesId, onAttributeAdded, onAttributeDeleted, onAttributeUpdated);

    return (
      <div>
        {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Attribute </button>}
        {showAddForm && (
          <div>
            <form>
              <strong>New Attribute</strong>

              <br></br>

              <span>Name: </span>
              <input value={newAttrName} onChange={(e) => setNewAttrName(e.target.value)} />

              <br></br>

              <span>Type: </span>
              <select value={newAttrType} onChange={(e) => setNewAttrType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="number">Number</option>
                <option value="string">String</option>
                <option value="enum">Enum</option>
                <option value="boolean">Boolean</option>
              </select>
            </form>
          </div>
        )}

      </div>
    )
}