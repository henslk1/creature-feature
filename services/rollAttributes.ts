import { rollEnum, rollInRange } from "../lib/serviceUtils";

export function rollAttributes(attributes: any[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const attribute of attributes) {
    switch (attribute.type) {
      case "number":
        result[attribute.name] = rollInRange(attribute.min, attribute.max);
        break;
      case "string":
        result[attribute.name] = "";
        break;
      case "enum":
        result[attribute.name] = rollEnum(attribute.options);
        break;
      default:
        break;
    }
  }

  return result;
}
