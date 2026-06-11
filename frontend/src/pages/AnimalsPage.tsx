import { useState, useEffect, Fragment } from "react";
import { type Animal } from "../types";
import { API_URL } from "../config";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AnimalsPage() {

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [expandedAnimal, setExpandedAnimal] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch(`${API_URL}/animals`)
      .then(res => { if(!res.ok) return; return res.json(); })
      .then(data => { if (data) setAnimals(data); });
  }, []);

  function toggleAnimal(id: number) {
    const updated = new Set(expandedAnimal);
    if(updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setExpandedAnimal(updated);
  }

  function deleteAnimal(id: number) {
    fetch(`${API_URL}/animals/${id}`, { method: "DELETE" })
      .then(res => { if (!res.ok) return; setAnimals(animals.filter(a => a.id !== id)); })
  }

  return (
    <div className="container mx-auto p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Animals</h1>
      </div>

      <div className="rounded-md border">
        <Table style={{ tableLayout: "fixed", width: "100%" }}>

          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "60px" }}>ID</TableHead>
              <TableHead style={{ width: "200px" }}>Name</TableHead>
              <TableHead style={{ width: "200px" }}>Breed</TableHead>
              <TableHead style={{ width: "120px" }}></TableHead>
              <TableHead style={{ width: "120px" }}></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {animals.map(a => (
              <Fragment key={a.id}>
                <TableRow>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.breed?.name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" type="button" onClick={() => toggleAnimal(a.id)}>
                      {expandedAnimal.has(a.id) ? "Hide" : "Details"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" type="button" onClick={() => deleteAnimal(a.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedAnimal.has(a.id) && (
                  <TableRow>
                    <TableCell colSpan={5} className="bg-muted/30 p-4 align-top">
                      <div style={{ display: "inline-flex", gap: "2rem" }}>

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
                            {Object.entries(a.expressedTraits).map(([gene, data]: [string, any]) => (
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
                            {Object.entries(a.stats).map(([stat, data]: [string, any]) => (
                              <tr key={stat} className="border-b last:border-0">
                                <td className="px-3 py-1">{stat}</td>
                                <td className="px-3 py-1">{data}</td>
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
                            {Object.entries(a.attributes).map(([attr, data]: [string, any]) => (
                              <tr key={attr} className="border-b last:border-0">
                                <td className="px-3 py-1">{attr}</td>
                                <td className="px-3 py-1">{String(data) || <em>User Defined</em>}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  )
}
