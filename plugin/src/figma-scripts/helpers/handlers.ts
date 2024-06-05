import { OperationResult } from './types';

/**
 * Handles JSON parse errors and logs the error message.
 * @param fileName The name of the file that caused the error.
 * @param error The error object.
 */
export function handleJsonParseError(fileName: string, error: unknown) {
  if (error instanceof Error) {
    figma.notify(`Error in ${fileName}: ${error.message}`);
    console.error(`Error parsing ${fileName}: ${error.message}`);
    figma.ui.postMessage({
      type: "error",
      message: `Error in ${fileName}: ${error.message}`,
    });
  } else {
    figma.notify(`Error in ${fileName}: Unknown parsing error`);
    console.error(`Error parsing ${fileName}: Unknown error`);
    figma.ui.postMessage({
      type: "error",
      message: `Error in ${fileName}: Unknown parsing error`,
    });
  }
}

/**
 * Handles errors that occur while processing tokens and logs the error message.
 * @param tokenName The name of the token that caused the error.
 * @param filename The name of the file that caused the error.
 * @param error The error object.
 * @param results The array of operation results to which the error message should be added.
 */
export function handleErrorProcessingToken(
  tokenName: string,
  filename: string,
  error: unknown,
  results: OperationResult[]
) {
  if (error instanceof Error) {
    results.push({
      result: "error",
      text: `Error processing ${tokenName} in ${filename}: ${error.message}`,
    });
  } else {
    results.push({
      result: "error",
      text: `Error processing ${tokenName} in ${filename}: Unknown error`,
    });
  }
}


export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
    figma.ui.postMessage({
      type: "error",
      message: `Unhandled error: ${error.message}`
    });
  } else {
    // Handle non-Error objects that might have been thrown
    console.error("Error:", error);
    figma.ui.postMessage({
      type: "error",
      message: `Unhandled error: ${String(error)}`
    });
  }
}