type WCAGItem = {
    ref_id: string;
    title: string;
    description: string;
    url: string;
    level?: string;
    references?: { title: string; url: string }[];
    notes?: { content: string }[];
    special_cases?: { title: string; description: string }[];
  };


type JsonToken = {
    $type: JsonTokenType;
    $value: any;
    $description?: string;
};

type JsonTokenDocument = Record<string, JsonToken>;

type OperationResult = {
    result: string;
    text: string;
};

type JsonTokenType = 'color' | 'dimension' | 'duration' | 'number' | 'boolean' | 'string';


figma.showUI(__html__, { width: 320, height: 780 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'create-wcag-card') {
        const item = msg.item;
        console.log("Item received for WCAG card creation:", item);
        createWcagCard(item);
    }
    else if (msg.type === 'import-files') {
        let allSuccess = true; // Start with assuming success
        const files: Record<string, JsonTokenDocument> = {};
        
        // Parse each file and check for errors
        msg.files.forEach((file: { name: string; content: string }) => {
            try {
                files[file.name] = JSON.parse(file.content);
            } catch (error) {
                allSuccess = false;
                if (error instanceof Error) {
                    figma.notify(`Error in ${file.name}: ${error.message}`);
                    console.error(`Error parsing ${file.name}: ${error.message}`);
                    figma.ui.postMessage({ type: 'error', message: `Error in ${file.name}: ${error.message}` });
                } else {
                    figma.notify(`Error in ${file.name}: Unknown parsing error`);
                    console.error(`Error parsing ${file.name}: Unknown error`);
                    figma.ui.postMessage({ type: 'error', message: `Error in ${file.name}: Unknown parsing error` });
                }
            }
        });

        // If no parsing errors, process the files
        if (allSuccess) {
            const results = await importTokens(files);
            results.forEach((result: OperationResult) => {
                if (result.result === 'error') {
                    allSuccess = false;
                    figma.ui.postMessage({ type: 'error', message: result.text });
                }
                figma.notify(result.text);
            });
        }

        // Send a success message only if all tokens were processed successfully and no files failed parsing
        if (allSuccess) {
            figma.ui.postMessage({ type: 'success', message: 'All files processed successfully' });
        } else {
            figma.ui.postMessage({ type: 'error', message: 'One or more files could not be processed successfully.' });
        }
    } else {
        console.log("Unhandled message type");
    }
};

async function importTokens(files: Record<string, JsonTokenDocument>): Promise<OperationResult[]> {
    let results: OperationResult[] = [];

    for (const [filename, tokens] of Object.entries(files)) {
        for (const [tokenName, tokenDetails] of Object.entries(tokens)) {
            try {

                if (!tokenDetails.$type || !tokenTypeToFigmaType(tokenDetails.$type)) {
                    const errorText = `Token type '${tokenDetails.$type}' is not supported for ${tokenName} in ${filename}.`;
                    results.push({
                        result: 'error',
                        text: errorText
                    });
                    console.error(errorText);
                    continue;
                }


                const figmaType = tokenTypeToFigmaType(tokenDetails.$type);
                if (!figmaType) {
                    results.push({
                        result: 'info',
                        text: `Token type '${tokenDetails.$type}' is not supported for ${tokenName} in ${filename}.`,
                    });
                    continue;
                }

                // Prepare the value according to its type
                let value = prepareValue(tokenDetails.$value, figmaType);

                await createOrUpdateVariable(tokenName, value, figmaType);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    results.push({ result: 'error', text: `Error processing ${tokenName} in ${filename}: ${error.message}` });
                } else {
                    results.push({ result: 'error', text: `Error processing ${tokenName} in ${filename}: Unknown error` });
                }
            }
        }
    }

    return results;
}

function prepareValue(value: any, type: VariableResolvedDataType): any {
    switch (type) {
        case 'COLOR':
            return jsonColorToFigmaColor(value);  
        case 'FLOAT':
            return parseFloat(value);  
        case 'BOOLEAN':
            return value.toLowerCase() === 'true';  
        case 'STRING':
            return value.toString(); 
        default:
            return value;
    }
}

function tokenTypeToFigmaType($type: JsonTokenType): VariableResolvedDataType | null {
    switch ($type) {
        case "color": return "COLOR";
        case "dimension":
        case "duration":
        case "number": return "FLOAT";
        case "boolean": return "BOOLEAN";
        case "string": return "STRING";
        default: return null;
    }
}

async function createOrUpdateVariable(tokenName: string, value: any, type: VariableResolvedDataType) {
    if (!figma.variables) {
        console.error('Variables feature is not enabled.');
        return;
    }

    try {
        let collections = await figma.variables.getLocalVariableCollectionsAsync();
        let collection = collections.find(c => c.name === "WCAG Tokens");
        // let collection = collections.length > 0 ? collections[0] : await figma.variables.createVariableCollection('Default Collection');

        if (!collection) {
            collection = await figma.variables.createVariableCollection("WCAG Tokens");
        }
        
        let variables = await figma.variables.getLocalVariablesAsync();
        let variable = variables.find(v => v.name === tokenName);

        if (!variable) {
            variable = await figma.variables.createVariable(tokenName, collection, type);
        }

        let modeId = collection.modes.length > 0 ? collection.modes[0].modeId : await collection.addMode('Default Mode');

        await variable.setValueForMode(modeId, value);
    } catch (error) {
        console.error(`Error in createOrUpdateVariable: ${error}`);
    }
}

function jsonColorToFigmaColor(hex: string): { r: number; g: number; b: number; a: number } {
    if (!/^#[0-9A-F]{6}$/i.test(hex)) {
        console.error(`Invalid hex color: ${hex}`);
        // return null;  
    }
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5, 7), 16) / 255;
    return { r, g, b, a: 1 }; 
}

let lastXPosition = 0;
// Create card code
async function createWcagCard(item: WCAGItem) {

    if (!item || !item.ref_id || !item.title) {
        console.error("Item data is incomplete:", item);
        return;
    }
  
    const frame = figma.createFrame();
    frame.name = `${item.ref_id} - ${item.title}`;
    frame.resize(394, 100);
    // frame.x = lastXPosition;
    frame.fills = [{ type: 'SOLID', color: hexToRgbFigma('F9F7FD') }];
    frame.strokeWeight = 1;
    frame.strokes = [{ type: 'SOLID', color: hexToRgbFigma('E3D5F6') }];
    frame.cornerRadius = 8;
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'FIXED';
    frame.paddingTop = 16;
    frame.paddingBottom = 16;
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.itemSpacing = 3;
    frame.clipsContent = true;
    
    // Calculate position
    const viewportCenter = figma.viewport.center;
    frame.x = viewportCenter.x - frame.width / 2 + lastXPosition;
    frame.y = viewportCenter.y - frame.height / 2;


    const refIDText = await createText(item.ref_id, {
        fontWeight: 'Bold',
        fontSize: 20,
        color: '7938D3',
        lineHeight: 28
    });
    frame.appendChild(refIDText);
  
    const levelText = await createText(item.level || "", {
        fontWeight: 'Bold',
        fontSize: 16,
        color: '111111',
        lineHeight: 24
    });
    frame.appendChild(levelText);
  
    const titleText = await createText(item.title, {
        fontWeight: 'Bold',
        fontSize: 28,
        color: '111111',
        lineHeight: 36
    });
    frame.appendChild(titleText);
  
    const descriptionText = await createText(item.description, {
        fontWeight: 'Regular',
        fontSize: 20,
        color: '111111',
        lineHeight: 28
    });
    frame.appendChild(descriptionText);
  
    const urlText = await createText(item.url, {
        fontWeight: 'Regular',
        fontSize: 16,
        color: '0000FF',
        lineHeight: 24
    });
    frame.appendChild(urlText);
  
    if (item.references && item.references.length > 0) {
        const referencesFrame = figma.createFrame();
        referencesFrame.name = "References Container";
        referencesFrame.fills = [{ type: 'SOLID', color: hexToRgbFigma('F9F7FD') }];
        referencesFrame.layoutMode = 'VERTICAL';
        referencesFrame.paddingTop = 16;
        referencesFrame.itemSpacing = 3;
        referencesFrame.clipsContent = true;
        referencesFrame.resize(394, referencesFrame.height);
  
        const referencesTitle = await createText("References", {
            fontWeight: 'Bold',
            fontSize: 20,
            color: '111111',
            lineHeight: 28
        });
        referencesFrame.appendChild(referencesTitle);
  
        for (const reference of item.references) {
            const referenceTitleText = await createText(reference.title, {
                fontWeight: 'Bold',
                fontSize: 16,
                color: '111111',
                lineHeight: 24
            });
            referencesFrame.appendChild(referenceTitleText);
  
            const referenceUrlText = await createText(reference.url, {
                fontWeight: 'Regular',
                fontSize: 16,
                color: '0000FF',
                lineHeight: 24
            });
            referencesFrame.appendChild(referenceUrlText);
        }
  
        frame.appendChild(referencesFrame);
        referencesFrame.resize(394 - 32, referencesFrame.height);
    }
  
    if (item.notes && item.notes.length > 0) {
        const notesFrame = figma.createFrame();
        notesFrame.name = "Notes Container";
        notesFrame.fills = [{ type: 'SOLID', color: hexToRgbFigma('F9F7FD') }];
        notesFrame.layoutMode = 'VERTICAL';
        notesFrame.paddingTop = 16;
        notesFrame.itemSpacing = 3;
        notesFrame.clipsContent = true;
        notesFrame.resize(394, notesFrame.height);
  
        const notesTitle = await createText("Notes", {
            fontWeight: 'Bold',
            fontSize: 20,
            color: '111111',
            lineHeight: 28
        });
        notesFrame.appendChild(notesTitle);
  
        for (const note of item.notes) {
            const noteText = await createText(note.content, {
                fontWeight: 'Regular',
                fontSize: 16,
                color: '111111',
                lineHeight: 24
            });
            notesFrame.appendChild(noteText);
        }
  
        frame.appendChild(notesFrame);
        notesFrame.resize(394 - 32, notesFrame.height);
    }
  
    if (item.special_cases && item.special_cases.length > 0) {
        const specialCasesFrame = figma.createFrame();
        specialCasesFrame.name = "Special Cases Container";
        specialCasesFrame.fills = [{ type: 'SOLID', color: hexToRgbFigma('F9F7FD') }];
        specialCasesFrame.layoutMode = 'VERTICAL';
        specialCasesFrame.paddingTop = 16;
        specialCasesFrame.itemSpacing = 3;
        specialCasesFrame.clipsContent = true;
        specialCasesFrame.resize(394, specialCasesFrame.height);
  
        const specialCasesTitle = await createText("Special Cases", {
            fontWeight: 'Bold',
            fontSize: 20,
            color: '111111',
            lineHeight: 28
        });
        specialCasesFrame.appendChild(specialCasesTitle);
  
        for (const specialCase of item.special_cases) {
            const specialCaseText = await createText(`${specialCase.title}: ${specialCase.description}`, {
                fontWeight: 'Regular',
                fontSize: 16,
                color: '111111',
                lineHeight: 24
            });
            specialCasesFrame.appendChild(specialCaseText);
        }
  
        frame.appendChild(specialCasesFrame);
        specialCasesFrame.resize(394 - 32, specialCasesFrame.height);
    }
  
    frame.resize(394, frame.height);
    figma.currentPage.appendChild(frame);
    // figma.viewport.scrollAndZoomIntoView([frame]);
    lastXPosition += frame.width + 20;
    console.log("Frame created and appended to the page.");
}
  
async function createText(content: string, style: { fontWeight?: string; fontSize?: number; color?: string; lineHeight?: number }) {
    const text = figma.createText();
  
    await figma.loadFontAsync({ family: "Inter", style: style.fontWeight || "Regular" });
  
    text.fontName = { family: "Inter", style: style.fontWeight || "Regular" };
    text.textAutoResize = 'HEIGHT';
    text.resize(394 - 32, text.height);
    text.characters = content;
    text.fontSize = style.fontSize || 12;
  
    if (style.color) {
        text.fills = [{ type: 'SOLID', color: hexToRgbFigma(style.color) }];
    }
    if (style.lineHeight) {
        text.lineHeight = { value: style.lineHeight, unit: 'PIXELS' };
    }
  
  
    return text;
}
  
function hexToRgbFigma(hex: string) {
let r = parseInt(hex.substring(0, 2), 16) / 255;
let g = parseInt(hex.substring(2, 4), 16) / 255;
let b = parseInt(hex.substring(4, 6), 16) / 255;
return { r, g, b };
}