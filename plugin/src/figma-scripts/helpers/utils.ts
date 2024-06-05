
import {  JsonTokenType, JsonTokenDocument } from './types';
import { handleJsonParseError } from './handlers';
import { importTokens } from '../operations/importTokens';


/**
 * Creates a text node in Figma with the specified content and style.
 * @param content The text content.
 * @param style The style options for the text node.
 * @returns The created text node.
 */
export async function processImportFiles(files: { name: string; content: string }[]) {
  let allSuccess = true;
  const fileData: Record<string, JsonTokenDocument> = {};

  files.forEach(file => {
    try {
      fileData[file.name] = JSON.parse(file.content);
    } catch (error) {
      allSuccess = false;
      handleJsonParseError(file.name, error);
    }
  });

  if (allSuccess) {
    const results = await importTokens(fileData);
    results.forEach(result => {
      if (result.result === "error") {
        allSuccess = false;
      }
      figma.ui.postMessage({ type: result.result, message: result.text });
      figma.notify(result.text);
    });
  }

  figma.ui.postMessage({
    type: allSuccess ? "success" : "error",
    message: allSuccess ? "All files processed successfully" : "One or more files could not be processed successfully."
  });
}


export async function createText(
  content: string,
  style: {
    fontWeight?: string;
    fontSize?: number;
    color?: string;
    lineHeight?: number;
    autoResize?: boolean;
  }
) {
  try {
    const text = figma.createText();

    console.log(`Loading font: ${style.fontWeight || "Regular"}`);
    await figma.loadFontAsync({
      family: "Inter",
      style: style.fontWeight || "Regular",
    });
    console.log(`Font loaded: ${style.fontWeight || "Regular"}`);

    text.fontName = { family: "Inter", style: style.fontWeight || "Regular" };

    if (style.autoResize) {
      text.textAutoResize = "WIDTH_AND_HEIGHT";
    } else {
      text.resize(394 - 32, text.height);
    }

    text.characters = content;
    text.fontSize = style.fontSize || 12;

    if (style.color) {
      text.fills = [{ type: "SOLID", color: hexToRgbFigma(style.color) }];
    }
    if (style.lineHeight) {
      text.lineHeight = { value: style.lineHeight, unit: "PIXELS" };
    }

    return text;
  } catch (error) {
    console.error("Error in createText:", error);
    throw error;
  }
}


/**
 * Converts a hex color value (like "#FFFFFF" or "FFFFFF") to an RGB object.
 * @param hex The hex color code as a string.
 * @returns An object with r, g, b properties, each ranging from 0 to 1.
 */
export function hexToRgbFigma(hex: string): { r: number; g: number; b: number } {
  // Ensure the hex string starts with '#'
  if (!hex.startsWith('#')) {
    hex = `#${hex}`;
  }

  // Check if the hex color format is valid
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    console.error(`Invalid hex color: ${hex}`);
    throw new Error(`Invalid hex color: ${hex}`);
  }

  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;
  return { r, g, b };
}

/**
 * Converts a JSON token type to a Figma variable type.
 * @param $type The JSON token type.
 * @returns The corresponding Figma variable type, or null if not supported.
 */
export function tokenTypeToFigmaType(
  $type: JsonTokenType
): VariableResolvedDataType | null {
  switch ($type) {
    case "color":
      return "COLOR";
    case "dimension":
    case "duration":
    case "number":
      return "FLOAT";
    case "boolean":
      return "BOOLEAN";
    case "string":
      return "STRING";
    default:
      return null;
  }
}

/**
 * Creates or updates a Figma variable with the specified name, value, and type.
 * @param tokenName The name of the variable.
 * @param value The value of the variable.
 * @param type The type of the variable.
 */
export async function createOrUpdateVariable(
  tokenName: string,
  value: any,
  type: VariableResolvedDataType
) {
  if (!figma.variables) {
    console.error("Variables feature is not enabled.");
    return;
  }

  try {
    let collections = await figma.variables.getLocalVariableCollectionsAsync();
    let collection = collections.find((c) => c.name === "WCAG Tokens");

    if (!collection) {
      collection = await figma.variables.createVariableCollection(
        "WCAG Tokens"
      );
    }

    let variables = await figma.variables.getLocalVariablesAsync();
    let variable = variables.find((v) => v.name === tokenName);

    if (!variable) {
      variable = await figma.variables.createVariable(
        tokenName,
        collection,
        type
      );
    }

    let modeId =
      collection.modes.length > 0
        ? collection.modes[0].modeId
        : await collection.addMode("Default Mode");

    await variable.setValueForMode(modeId, value);
  } catch (error) {
    console.error(`Error in createOrUpdateVariable: ${error}`);
  }
}


/**
 * Prepares a value for a Figma variable based on its type.
 * @param value The value to be prepared.
 * @param type The type of the Figma variable.
 * @returns The prepared value.
 */
export function prepareValue(value: any, type: VariableResolvedDataType): any {
  switch (type) {
    case "COLOR":
      return jsonColorToFigmaColor(value);
    case "FLOAT":
      return parseFloat(value);
    case "BOOLEAN":
      return value.toLowerCase() === "true";
    case "STRING":
      return value.toString();
    default:
      return value;
  }
}

/**
 * Converts a hex color value to an RGBA color object for Figma.
 * @param hex The hex color value.
 * @returns The RGBA color object.
 */
export function jsonColorToFigmaColor(hex: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    console.error(`Invalid hex color: ${hex}`);
  }
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;
  return { r, g, b, a: 1 };
}
