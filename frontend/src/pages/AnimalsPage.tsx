import { useState, useEffect, Fragment } from "react";
import { type Animal } from "../types";
import { API_URL } from "../config";

export function AnimalsPage() {

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [expandedAnimal, setExpandedAnimal] = useState<Set<number>>(new Set());

  // Landing Page
  useEffect(() => {
    fetch(`${API_URL}/animals`)
      .then(res => { if(!res.ok) return; return res.json(); })
      .then(data => { if (data) setAnimals(data); });
  }, []);

  // Toggle
  function toggleAnimal(id: number) {
    const updated = new Set(expandedAnimal);
    if(updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setExpandedAnimal(updated);
  }

  return (
    <div>

      <table style={{ tableLayout: "fixed", width: "500px" }}>

        <thead>
          <tr>
            <th style={{ width: "50px" }}>ID</th>
            <th style={{ width: "150px" }}>Name</th>
            <th style={{ width: "150px" }}>Breed</th>
            <th style={{ width: "100px" }}></th>
          </tr>
        </thead>

        <tbody>
          {animals.map(a => (
            <Fragment key={a.id}>
              <tr>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.breed?.name}</td>
                <td>
                  <button type="button" onClick={() => toggleAnimal(a.id)}>Details</button>
                </td>
              </tr>
              {expandedAnimal.has(a.id) && (
                <tr>
                  <td colSpan={4}>
                    <div style={{ display: "inline-flex", gap: "2rem" }}>

                      <table border={1} cellPadding={6} style={{ alignSelf: "flex-start" }}>
                        <caption><strong>Genes</strong></caption>
                        <thead>
                          <tr>
                            <th>Trait</th>
                            <th>Expression</th>
                            <th>Genotype</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(a.expressedTraits).map(([gene, data]: [string, any]) => (
                            <tr key={gene}>
                              <td>{gene}</td>
                              <td>{data.expression}</td>
                              <td>{data.allele1}/{data.allele2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <table border={1} cellPadding={6} style={{ alignSelf: "flex-start" }}>
                        <caption><strong>Stats</strong></caption>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(a.stats).map(([stat, data]: [string, any]) => (
                            <tr key={stat}>
                              <td>{stat}</td>
                              <td>{data}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <table border={1} cellPadding={6} style={{ alignSelf: "flex-start" }}>
                        <caption><strong>Attributes</strong></caption>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(a.attributes).map(([attr, data]: [string, any]) => (
                            <tr key={attr}>
                              <td>{attr}</td>
                              <td>{String(data) || <em>User Defined</em>}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>

      </table>
    </div>
  )
}
