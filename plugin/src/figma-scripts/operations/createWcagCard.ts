import { WCAGItem } from '../helpers/types';
import { hexToRgbFigma, createText } from '../helpers/utils';
import { COLORS, FONT_WEIGHT, FONT_SIZES, LINE_HEIGHTS, PADDING, CORNER_RADIUS } from '../helpers/constants';

/**
 * Creates a WCAG card in Figma based on the provided item data.
 * @param item The WCAG item data.
 */

let lastXPosition = 0;
export async function createWcagCard(item: WCAGItem) {
  try {
    if (!item || !item.ref_id || !item.title) {
      console.error("Item data is incomplete:", item);
      return;
    }

    console.log("Loading fonts...");
    await figma.loadFontAsync({ family: "Inter", style: FONT_WEIGHT.bold });
    await figma.loadFontAsync({ family: "Inter", style: FONT_WEIGHT.regular });
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
    frame.paddingTop = PADDING.large;
    frame.paddingBottom = PADDING.large;
    frame.paddingLeft = PADDING.large;
    frame.paddingRight = PADDING.large;
    frame.itemSpacing = 3;
    frame.fills = [{ type: "SOLID", color: hexToRgbFigma(COLORS.base) }];
    frame.strokeWeight = 1;
    frame.strokes = [{ type: "SOLID", color: hexToRgbFigma(COLORS.stroke) }];
    frame.cornerRadius = CORNER_RADIUS.medium;
    frame.clipsContent = true;

    const refIDText = await createText(item.ref_id, {
      fontWeight: FONT_WEIGHT.bold,
      fontSize: FONT_SIZES.large,
      color: COLORS.highlight,
      lineHeight: LINE_HEIGHTS.large,
      autoResize: true,
    });

    const refIDContainer = figma.createFrame();
    refIDContainer.layoutMode = "HORIZONTAL";
    refIDContainer.counterAxisSizingMode = "AUTO";
    refIDContainer.primaryAxisSizingMode = "AUTO";
    refIDContainer.paddingLeft = PADDING.none;
    refIDContainer.paddingRight = PADDING.small;
    refIDContainer.paddingTop = PADDING.small;
    refIDContainer.paddingBottom = PADDING.small;
    refIDContainer.cornerRadius = CORNER_RADIUS.large;
    refIDContainer.appendChild(refIDText);

    const levelText = await createText(item.level || "", {
      fontWeight: FONT_WEIGHT.bold,
      fontSize: FONT_SIZES.small,
      color: COLORS.white,
      lineHeight: LINE_HEIGHTS.small,
      autoResize: true,
    });

    const levelContainer = figma.createFrame();
    levelContainer.layoutMode = "HORIZONTAL";
    levelContainer.counterAxisSizingMode = "AUTO";
    levelContainer.primaryAxisSizingMode = "AUTO";
    levelContainer.paddingLeft = PADDING.medium;
    levelContainer.paddingRight = PADDING.medium;
    levelContainer.paddingTop = PADDING.small;
    levelContainer.paddingBottom = PADDING.small;
    levelContainer.cornerRadius = CORNER_RADIUS.small;
    levelContainer.fills = [{ type: "SOLID", color: hexToRgbFigma(COLORS.dark) }];
    levelContainer.appendChild(levelText);

    const versionText = await createText(item.version || "", {
      fontWeight: FONT_WEIGHT.bold,
      fontSize: FONT_SIZES.small,
      color: COLORS.white,
      lineHeight: LINE_HEIGHTS.small,
      autoResize: true,
    });

    const versionContainer = figma.createFrame();
    versionContainer.layoutMode = "HORIZONTAL";
    versionContainer.counterAxisSizingMode = "AUTO";
    versionContainer.primaryAxisSizingMode = "AUTO";
    versionContainer.paddingLeft = PADDING.medium;
    versionContainer.paddingRight = PADDING.medium;
    versionContainer.paddingTop = PADDING.small;
    versionContainer.paddingBottom = PADDING.small;
    versionContainer.cornerRadius = CORNER_RADIUS.small;
    versionContainer.fills = [
      { type: "SOLID", color: hexToRgbFigma(COLORS.highlight) },
    ];
    versionContainer.appendChild(versionText);

    const horizontalFrame = figma.createFrame();
    horizontalFrame.name = "TEXT CONTAINER";
    horizontalFrame.layoutMode = "HORIZONTAL";
    horizontalFrame.primaryAxisSizingMode = "AUTO";
    horizontalFrame.counterAxisSizingMode = "AUTO";
    horizontalFrame.itemSpacing = 10;
    horizontalFrame.fills = [];

    horizontalFrame.appendChild(refIDContainer);
    horizontalFrame.appendChild(levelContainer);
    horizontalFrame.appendChild(versionContainer);
    frame.appendChild(horizontalFrame);

    const titleText = await createText(item.title, {
      fontWeight: FONT_WEIGHT.bold,
      fontSize: FONT_SIZES.large,
      color: COLORS.text,
      lineHeight: LINE_HEIGHTS.large,
    });
    frame.appendChild(titleText);

    const descriptionText = await createText(item.description, {
      fontWeight: FONT_WEIGHT.regular,
      fontSize: FONT_SIZES.medium,
      color: COLORS.text,
      lineHeight: LINE_HEIGHTS.medium,
    });
    frame.appendChild(descriptionText);

    const urlText = await createText(item.url, {
      fontWeight: FONT_WEIGHT.regular,
      fontSize: FONT_SIZES.small,
      color: COLORS.link,
      lineHeight: LINE_HEIGHTS.small,
    });
    frame.appendChild(urlText);

    if (item.notes && item.notes.length > 0) {
      const notesFrame = figma.createFrame();
      notesFrame.name = "Notes Container";
      notesFrame.layoutMode = "VERTICAL";
      notesFrame.primaryAxisSizingMode = "AUTO";
      notesFrame.counterAxisSizingMode = "AUTO";
      notesFrame.paddingTop = PADDING.large;
      notesFrame.itemSpacing = 3;
      notesFrame.clipsContent = true;
      notesFrame.fills = [{ type: "SOLID", color: hexToRgbFigma(COLORS.base) }];

      const notesTitle = await createText("Notes", {
        fontWeight: FONT_WEIGHT.bold,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        lineHeight: LINE_HEIGHTS.medium,
      });
      notesFrame.appendChild(notesTitle);

      for (const note of item.notes) {
        const noteText = await createText(note.content, {
          fontWeight: FONT_WEIGHT.regular,
          fontSize: FONT_SIZES.small,
          color: COLORS.text,
          lineHeight: LINE_HEIGHTS.small,
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
      specialCasesFrame.paddingTop = PADDING.large;
      specialCasesFrame.itemSpacing = 3;
      specialCasesFrame.clipsContent = true;
      specialCasesFrame.fills = [
        { type: "SOLID", color: hexToRgbFigma(COLORS.base) },
      ];

      const specialCasesTitle = await createText("Special Cases", {
        fontWeight: FONT_WEIGHT.bold,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        lineHeight: LINE_HEIGHTS.medium,
      });
      specialCasesFrame.appendChild(specialCasesTitle);

      for (const specialCase of item.special_cases) {
        const specialCaseText = await createText(
          `${specialCase.title}: ${specialCase.description}`,
          {
            fontWeight: FONT_WEIGHT.regular,
            fontSize: FONT_SIZES.small,
            color: COLORS.text,
            lineHeight: LINE_HEIGHTS.small,
          }
        );
        specialCasesFrame.appendChild(specialCaseText);
      }

      frame.appendChild(specialCasesFrame);
    }

    if (item.references && item.references.length > 0) {
      const referencesFrame = figma.createFrame();
      referencesFrame.name = "References Container";
      referencesFrame.layoutMode = "VERTICAL";
      referencesFrame.primaryAxisSizingMode = "AUTO";
      referencesFrame.counterAxisSizingMode = "AUTO";
      referencesFrame.paddingTop = PADDING.large;
      referencesFrame.itemSpacing = 3;
      referencesFrame.clipsContent = true;
      referencesFrame.fills = [
        { type: "SOLID", color: hexToRgbFigma(COLORS.base) },
      ];

      const referencesTitle = await createText("References", {
        fontWeight: FONT_WEIGHT.bold,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        lineHeight: LINE_HEIGHTS.medium,
      });
      referencesFrame.appendChild(referencesTitle);

      for (const reference of item.references) {
        const referenceTitleText = await createText(reference.title, {
          fontWeight: FONT_WEIGHT.bold,
          fontSize: FONT_SIZES.small,
          color: COLORS.text,
          lineHeight: LINE_HEIGHTS.small,
        });
        referencesFrame.appendChild(referenceTitleText);

        const referenceUrlText = await createText(reference.url, {
          fontWeight: FONT_WEIGHT.regular,
          fontSize: FONT_SIZES.small,
          color: COLORS.link,
          lineHeight: LINE_HEIGHTS.small,
        });
        referencesFrame.appendChild(referenceUrlText);
      }

      frame.appendChild(referencesFrame);
    }


    component.appendChild(frame);
    component.resize(frame.width, frame.height);

    const instance = component.createInstance();
    instance.x = figma.viewport.center.x - instance.width / 2 + lastXPosition;
    instance.y = figma.viewport.center.y - instance.height / 2;
    instance.visible = true;

    console.log("Instance width:", instance.width);

    figma.currentPage.appendChild(instance);
    lastXPosition += instance.width + 20;

    component.remove();

    console.log(
      "Component instance created and appended to the page, and the original component removed."
    );
  } catch (error) {
    console.error("Error in createWcagCard:", error);
    if (error instanceof Error) {
      figma.ui.postMessage({
        type: "error",
        message: `Error creating WCAG card: ${error.message}`,
      });
    } else {
      figma.ui.postMessage({
        type: "error",
        message: `Error creating WCAG card: ${String(error)}`,
      });
    }
  }
}
