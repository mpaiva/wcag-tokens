
import { tokenTypeToFigmaType, createOrUpdateVariable, prepareValue } from '../helpers/utils'; 
import { JsonTokenDocument,  OperationResult } from '../helpers/types';
import { handleErrorProcessingToken } from '../helpers/handlers';


/**
 * Imports tokens from the provided JSON files and creates or updates variables in Figma.
 * @param files The JSON files containing the tokens.
 * @returns A promise that resolves to an array of operation results.
 */
export async function importTokens(
  files: Record<string, JsonTokenDocument>
): Promise<OperationResult[]> {
  let results: OperationResult[] = [];

  for (const [filename, tokens] of Object.entries(files)) {
    for (const [tokenName, tokenDetails] of Object.entries(tokens)) {
      try {
        const figmaType = tokenTypeToFigmaType(tokenDetails.$type);
        if (!figmaType) {
          const errorText = `Token type '${tokenDetails.$type}' is not supported for ${tokenName} in ${filename}.`;
          results.push({ result: "error", text: errorText });
          console.error(errorText);
          continue;
        }

        const value = prepareValue(tokenDetails.$value, figmaType);
        await createOrUpdateVariable(tokenName, value, figmaType);
      } catch (error) {
        handleErrorProcessingToken(tokenName, filename, error, results);
      }
    }
  }

  return results;
}