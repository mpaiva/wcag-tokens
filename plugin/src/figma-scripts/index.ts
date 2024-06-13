 
import { handleError } from './helpers/handlers';
import { processImportFiles } from './helpers/utils';
import { createWcagCard } from './operations/createWcagCard';
 

figma.showUI(__html__, { width: 320, height: 640 });

figma.ui.onmessage = async (msg) => {
  try {
    switch (msg.type) {
      case "create-wcag-card":
        await createWcagCard(msg.item);
        break;
      case "import-files":
        await processImportFiles(msg.files);
        break;
      default:
        console.log("Unhandled message type");
    }
  } catch (error) {
    handleError(error);
  }
};




