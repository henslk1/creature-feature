import { rollEnum, rollInRange } from "../lib/serviceUtils";

export function rollAttributes(attributes: any[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const attribute of attributes) {
    switch (attribute.type) {
      case "Number":
        result[attribute.name] = rollInRange(attribute.min, attribute.max);
        break;
      case "String":
        result[attribute.name] = "";
        break;
      case "Enum":
        result[attribute.name] = rollEnum(attribute.options);
        break;
      case "Boolean":
        result[attribute.name] = Math.random() < 0.5;
        break;
      default:
        break;
    }
  }

  return result;
}
