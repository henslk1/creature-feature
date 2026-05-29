import { rollEnum, rollInRange, rollString } from "../lib/rollUtils";

export function rollAttributes(attributes: any[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const attribute of attributes) {

    switch (attribute.type) {
      case "number": 
        result[attribute.name] = rollInRange(attribute.min, attribute.max);
        break;
      case "string":
        break;
      case "enum":
        result[attribute.name] = rollEnum(attribute.options);
        break;

    }
  }

  return result;
}