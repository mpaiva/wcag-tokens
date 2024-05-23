"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let lastXPosition = 0; // Ensure this is declared globally
figma.showUI(__html__, { width: 320, height: 640 });
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (msg.type === "create-wcag-card") {
            const item = msg.item;
            console.log("Item received for WCAG card creation:", item);
            yield createWcagCard(item);
        }
        else if (msg.type === "import-files") {
            let allSuccess = true;
            const files = {};
            msg.files.forEach((file) => {
                try {
                    files[file.name] = JSON.parse(file.content);
                }
                catch (error) {
                    allSuccess = false;
                    handleJsonParseError(file.name, error);
                }
            });
            if (allSuccess) {
                const results = yield importTokens(files);
                results.forEach((result) => {
                    if (result.result === "error") {
                        allSuccess = false;
                        figma.ui.postMessage({ type: "error", message: result.text });
                    }
                    figma.notify(result.text);
                });
            }
            if (allSuccess) {
                figma.ui.postMessage({
                    type: "success",
                    message: "All files processed successfully",
                });
            }
            else {
                figma.ui.postMessage({
                    type: "error",
                    message: "One or more files could not be processed successfully.",
                });
            }
        }
        else {
            console.log("Unhandled message type");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            figma.ui.postMessage({
                type: "error",
                message: `Unhandled error: ${error.message}`,
            });
        }
        else {
            figma.ui.postMessage({
                type: "error",
                message: `Unhandled error: ${String(error)}`,
            });
        }
    }
});
function handleJsonParseError(fileName, error) {
    if (error instanceof Error) {
        figma.notify(`Error in ${fileName}: ${error.message}`);
        console.error(`Error parsing ${fileName}: ${error.message}`);
        figma.ui.postMessage({
            type: "error",
            message: `Error in ${fileName}: ${error.message}`,
        });
    }
    else {
        figma.notify(`Error in ${fileName}: Unknown parsing error`);
        console.error(`Error parsing ${fileName}: Unknown error`);
        figma.ui.postMessage({
            type: "error",
            message: `Error in ${fileName}: Unknown parsing error`,
        });
    }
}
function importTokens(files) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
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
                    yield createOrUpdateVariable(tokenName, value, figmaType);
                }
                catch (error) {
                    handleErrorProcessingToken(tokenName, filename, error, results);
                }
            }
        }
        return results;
    });
}
function handleErrorProcessingToken(tokenName, filename, error, results) {
    if (error instanceof Error) {
        results.push({
            result: "error",
            text: `Error processing ${tokenName} in ${filename}: ${error.message}`,
        });
    }
    else {
        results.push({
            result: "error",
            text: `Error processing ${tokenName} in ${filename}: Unknown error`,
        });
    }
}
function createWcagCard(item) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!item || !item.ref_id || !item.title) {
                console.error("Item data is incomplete:", item);
                return;
            }
            console.log("Loading fonts...");
            yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
            yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
            console.log("Fonts loaded.");
            // Create a hidden component
            const component = figma.createComponent();
            component.name = `${item.ref_id} - ${item.title}`;
            component.visible = false;
            const frame = figma.createFrame();
            frame.name = `${item.ref_id} - ${item.title}`;
            frame.layoutMode = "VERTICAL";
            frame.primaryAxisSizingMode = "AUTO";
            frame.counterAxisSizingMode = "AUTO";
            frame.paddingTop = 16;
            frame.paddingBottom = 16;
            frame.paddingLeft = 16;
            frame.paddingRight = 16;
            frame.itemSpacing = 3;
            frame.fills = [{ type: "SOLID", color: hexToRgbFigma("F9F7FD") }];
            frame.strokeWeight = 1;
            frame.strokes = [{ type: "SOLID", color: hexToRgbFigma("E3D5F6") }];
            frame.cornerRadius = 8;
            frame.clipsContent = true;
            const refIDText = yield createText(item.ref_id, {
                fontWeight: "Bold",
                fontSize: 28,
                color: "7938D3",
                lineHeight: 28,
                autoResize: true, // Enable autoResize
            });
            const refIDContainer = figma.createFrame();
            refIDContainer.layoutMode = "HORIZONTAL";
            refIDContainer.counterAxisSizingMode = "AUTO";
            refIDContainer.primaryAxisSizingMode = "AUTO";
            refIDContainer.paddingLeft = 0;
            refIDContainer.paddingRight = 8;
            refIDContainer.paddingTop = 4;
            refIDContainer.paddingBottom = 4;
            refIDContainer.cornerRadius = 12;
            refIDContainer.appendChild(refIDText);
            const levelText = yield createText(item.level || "", {
                fontWeight: "Bold",
                fontSize: 16,
                color: "FFFFFF", // White text
                lineHeight: 24,
                autoResize: true, // Enable autoResize
            });
            const levelContainer = figma.createFrame();
            levelContainer.layoutMode = "HORIZONTAL";
            levelContainer.counterAxisSizingMode = "AUTO";
            levelContainer.primaryAxisSizingMode = "AUTO";
            levelContainer.paddingLeft = 8;
            levelContainer.paddingRight = 8;
            levelContainer.paddingTop = 4;
            levelContainer.paddingBottom = 4;
            levelContainer.cornerRadius = 4;
            levelContainer.fills = [{ type: "SOLID", color: hexToRgbFigma("111111") }];
            levelContainer.appendChild(levelText);
            const versionText = yield createText(item.version || "", {
                fontWeight: "Bold",
                fontSize: 16,
                color: "FFFFFF", // White text
                lineHeight: 24,
                autoResize: true, // Enable autoResize
            });
            const versionContainer = figma.createFrame();
            versionContainer.layoutMode = "HORIZONTAL";
            versionContainer.counterAxisSizingMode = "AUTO";
            versionContainer.primaryAxisSizingMode = "AUTO";
            versionContainer.paddingLeft = 8;
            versionContainer.paddingRight = 8;
            versionContainer.paddingTop = 4;
            versionContainer.paddingBottom = 4;
            versionContainer.cornerRadius = 4;
            versionContainer.fills = [
                { type: "SOLID", color: hexToRgbFigma("7938D3") },
            ];
            versionContainer.appendChild(versionText);
            // Create a horizontal frame to contain the text nodes
            const horizontalFrame = figma.createFrame();
            horizontalFrame.name = "TEXT CONTAINER";
            horizontalFrame.layoutMode = "HORIZONTAL"; // Set layout mode to horizontal
            horizontalFrame.primaryAxisSizingMode = "AUTO"; // Automatically adjust frame size
            horizontalFrame.counterAxisSizingMode = "AUTO"; // Automatically adjust frame size
            horizontalFrame.itemSpacing = 10; // Space between items
            horizontalFrame.fills = []; // Transparent background
            // Append the text node containers to the horizontal frame
            horizontalFrame.appendChild(refIDContainer);
            horizontalFrame.appendChild(levelContainer);
            horizontalFrame.appendChild(versionContainer);
            frame.appendChild(horizontalFrame);
            const titleText = yield createText(item.title, {
                fontWeight: "Bold",
                fontSize: 28,
                color: "111111",
                lineHeight: 36,
            });
            frame.appendChild(titleText);
            const descriptionText = yield createText(item.description, {
                fontWeight: "Regular",
                fontSize: 20,
                color: "111111",
                lineHeight: 28,
            });
            frame.appendChild(descriptionText);
            const urlText = yield createText(item.url, {
                fontWeight: "Regular",
                fontSize: 16,
                color: "0000FF",
                lineHeight: 24,
            });
            frame.appendChild(urlText);
            if (item.references && item.references.length > 0) {
                const referencesFrame = figma.createFrame();
                referencesFrame.name = "References Container";
                referencesFrame.layoutMode = "VERTICAL";
                referencesFrame.primaryAxisSizingMode = "AUTO";
                referencesFrame.counterAxisSizingMode = "AUTO";
                referencesFrame.paddingTop = 16;
                referencesFrame.itemSpacing = 3;
                referencesFrame.clipsContent = true;
                referencesFrame.fills = [
                    { type: "SOLID", color: hexToRgbFigma("F9F7FD") },
                ];
                const referencesTitle = yield createText("References", {
                    fontWeight: "Bold",
                    fontSize: 20,
                    color: "111111",
                    lineHeight: 28,
                });
                referencesFrame.appendChild(referencesTitle);
                for (const reference of item.references) {
                    const referenceTitleText = yield createText(reference.title, {
                        fontWeight: "Bold",
                        fontSize: 16,
                        color: "111111",
                        lineHeight: 24,
                    });
                    referencesFrame.appendChild(referenceTitleText);
                    const referenceUrlText = yield createText(reference.url, {
                        fontWeight: "Regular",
                        fontSize: 16,
                        color: "0000FF",
                        lineHeight: 24,
                    });
                    referencesFrame.appendChild(referenceUrlText);
                }
                frame.appendChild(referencesFrame);
            }
            if (item.notes && item.notes.length > 0) {
                const notesFrame = figma.createFrame();
                notesFrame.name = "Notes Container";
                notesFrame.layoutMode = "VERTICAL";
                notesFrame.primaryAxisSizingMode = "AUTO";
                notesFrame.counterAxisSizingMode = "AUTO";
                notesFrame.paddingTop = 16;
                notesFrame.itemSpacing = 3;
                notesFrame.clipsContent = true;
                notesFrame.fills = [{ type: "SOLID", color: hexToRgbFigma("F9F7FD") }];
                const notesTitle = yield createText("Notes", {
                    fontWeight: "Bold",
                    fontSize: 20,
                    color: "111111",
                    lineHeight: 28,
                });
                notesFrame.appendChild(notesTitle);
                for (const note of item.notes) {
                    const noteText = yield createText(note.content, {
                        fontWeight: "Regular",
                        fontSize: 16,
                        color: "111111",
                        lineHeight: 24,
                    });
                    notesFrame.appendChild(noteText);
                }
                frame.appendChild(notesFrame);
            }
            if (item.special_cases && item.special_cases.length > 0) {
                const specialCasesFrame = figma.createFrame();
                specialCasesFrame.name = "Special Cases Container";
                specialCasesFrame.layoutMode = "VERTICAL";
                specialCasesFrame.primaryAxisSizingMode = "AUTO";
                specialCasesFrame.counterAxisSizingMode = "AUTO";
                specialCasesFrame.paddingTop = 16;
                specialCasesFrame.itemSpacing = 3;
                specialCasesFrame.clipsContent = true;
                specialCasesFrame.fills = [
                    { type: "SOLID", color: hexToRgbFigma("F9F7FD") },
                ];
                const specialCasesTitle = yield createText("Special Cases", {
                    fontWeight: "Bold",
                    fontSize: 20,
                    color: "111111",
                    lineHeight: 28,
                });
                specialCasesFrame.appendChild(specialCasesTitle);
                for (const specialCase of item.special_cases) {
                    const specialCaseText = yield createText(`${specialCase.title}: ${specialCase.description}`, {
                        fontWeight: "Regular",
                        fontSize: 16,
                        color: "111111",
                        lineHeight: 24,
                    });
                    specialCasesFrame.appendChild(specialCaseText);
                }
                frame.appendChild(specialCasesFrame);
            }
            // Append the frame to the component and adjust its size
            component.appendChild(frame);
            component.resize(frame.width, frame.height);
            const instance = component.createInstance();
            instance.x = figma.viewport.center.x - instance.width / 2 + lastXPosition;
            instance.y = figma.viewport.center.y - instance.height / 2;
            instance.visible = true;
            // Log the width of the instance
            console.log("Instance width:", instance.width);
            figma.currentPage.appendChild(instance);
            lastXPosition += instance.width + 20;
            // Delete the component after creating the instance
            component.remove();
            console.log("Component instance created and appended to the page, and the original component removed.");
        }
        catch (error) {
            console.error("Error in createWcagCard:", error);
            if (error instanceof Error) {
                figma.ui.postMessage({
                    type: "error",
                    message: `Error creating WCAG card: ${error.message}`,
                });
            }
            else {
                figma.ui.postMessage({
                    type: "error",
                    message: `Error creating WCAG card: ${String(error)}`,
                });
            }
        }
    });
}
function createText(content, style) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const text = figma.createText();
            console.log(`Loading font: ${style.fontWeight || "Regular"}`);
            yield figma.loadFontAsync({
                family: "Inter",
                style: style.fontWeight || "Regular",
            });
            console.log(`Font loaded: ${style.fontWeight || "Regular"}`);
            text.fontName = { family: "Inter", style: style.fontWeight || "Regular" };
            if (style.autoResize) {
                text.textAutoResize = "WIDTH_AND_HEIGHT"; // Set auto width and height if autoResize is true
            }
            else {
                text.resize(394 - 32, text.height); // Otherwise, set a fixed width (adjust as needed)
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
        }
        catch (error) {
            console.error("Error in createText:", error);
            throw error;
        }
    });
}
function hexToRgbFigma(hex) {
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return { r, g, b };
}
function tokenTypeToFigmaType($type) {
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
function prepareValue(value, type) {
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
function createOrUpdateVariable(tokenName, value, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!figma.variables) {
            console.error("Variables feature is not enabled.");
            return;
        }
        try {
            let collections = yield figma.variables.getLocalVariableCollectionsAsync();
            let collection = collections.find((c) => c.name === "WCAG Tokens");
            if (!collection) {
                collection = yield figma.variables.createVariableCollection("WCAG Tokens");
            }
            let variables = yield figma.variables.getLocalVariablesAsync();
            let variable = variables.find((v) => v.name === tokenName);
            if (!variable) {
                variable = yield figma.variables.createVariable(tokenName, collection, type);
            }
            let modeId = collection.modes.length > 0
                ? collection.modes[0].modeId
                : yield collection.addMode("Default Mode");
            yield variable.setValueForMode(modeId, value);
        }
        catch (error) {
            console.error(`Error in createOrUpdateVariable: ${error}`);
        }
    });
}
function jsonColorToFigmaColor(hex) {
    if (!/^#[0-9A-F]{6}$/i.test(hex)) {
        console.error(`Invalid hex color: ${hex}`);
    }
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5, 7), 16) / 255;
    return { r, g, b, a: 1 };
}
