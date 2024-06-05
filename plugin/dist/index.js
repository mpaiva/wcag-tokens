(()=>{"use strict";function e(e,n,t,i){t instanceof Error?i.push({result:"error",text:`Error processing ${e} in ${n}: ${t.message}`}):i.push({result:"error",text:`Error processing ${e} in ${n}: Unknown error`})}var n=function(e,n,t,i){return new(t||(t=Promise))((function(o,r){function a(e){try{c(i.next(e))}catch(e){r(e)}}function s(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}c((i=i.apply(e,n||[])).next())}))};function t(t){return n(this,void 0,void 0,(function*(){let n=!0;const i={};if(t.forEach((e=>{try{i[e.name]=JSON.parse(e.content)}catch(t){n=!1,function(e,n){n instanceof Error?(figma.notify(`Error in ${e}: ${n.message}`),console.error(`Error parsing ${e}: ${n.message}`),figma.ui.postMessage({type:"error",message:`Error in ${e}: ${n.message}`})):(figma.notify(`Error in ${e}: Unknown parsing error`),console.error(`Error parsing ${e}: Unknown error`),figma.ui.postMessage({type:"error",message:`Error in ${e}: Unknown parsing error`}))}(e.name,t)}})),n){const t=yield function(n){return t=this,i=void 0,c=function*(){let t=[];for(const[i,o]of Object.entries(n))for(const[n,c]of Object.entries(o))try{const e=r(c.$type);if(!e){const e=`Token type '${c.$type}' is not supported for ${n} in ${i}.`;t.push({result:"error",text:e}),console.error(e);continue}const o=s(c.$value,e);yield a(n,o,e)}catch(o){e(n,i,o,t)}return t},new((o=void 0)||(o=Promise))((function(e,n){function r(e){try{s(c.next(e))}catch(e){n(e)}}function a(e){try{s(c.throw(e))}catch(e){n(e)}}function s(n){var t;n.done?e(n.value):(t=n.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}s((c=c.apply(t,i||[])).next())}));var t,i,o,c}(i);t.forEach((e=>{"error"===e.result&&(n=!1),figma.ui.postMessage({type:e.result,message:e.text}),figma.notify(e.text)}))}figma.ui.postMessage({type:n?"success":"error",message:n?"All files processed successfully":"One or more files could not be processed successfully."})}))}function i(e,t){return n(this,void 0,void 0,(function*(){try{const n=figma.createText();return console.log(`Loading font: ${t.fontWeight||"Regular"}`),yield figma.loadFontAsync({family:"Inter",style:t.fontWeight||"Regular"}),console.log(`Font loaded: ${t.fontWeight||"Regular"}`),n.fontName={family:"Inter",style:t.fontWeight||"Regular"},t.autoResize?n.textAutoResize="WIDTH_AND_HEIGHT":n.resize(362,n.height),n.characters=e,n.fontSize=t.fontSize||12,t.color&&(n.fills=[{type:"SOLID",color:o(t.color)}]),t.lineHeight&&(n.lineHeight={value:t.lineHeight,unit:"PIXELS"}),n}catch(e){throw console.error("Error in createText:",e),e}}))}function o(e){if(e.startsWith("#")||(e=`#${e}`),!/^#[0-9A-F]{6}$/i.test(e))throw console.error(`Invalid hex color: ${e}`),new Error(`Invalid hex color: ${e}`);return{r:parseInt(e.substring(1,3),16)/255,g:parseInt(e.substring(3,5),16)/255,b:parseInt(e.substring(5,7),16)/255}}function r(e){switch(e){case"color":return"COLOR";case"dimension":case"duration":case"number":return"FLOAT";case"boolean":return"BOOLEAN";case"string":return"STRING";default:return null}}function a(e,t,i){return n(this,void 0,void 0,(function*(){if(figma.variables)try{let n=(yield figma.variables.getLocalVariableCollectionsAsync()).find((e=>"WCAG Tokens"===e.name));n||(n=yield figma.variables.createVariableCollection("WCAG Tokens"));let o=(yield figma.variables.getLocalVariablesAsync()).find((n=>n.name===e));o||(o=yield figma.variables.createVariable(e,n,i));let r=n.modes.length>0?n.modes[0].modeId:yield n.addMode("Default Mode");yield o.setValueForMode(r,t)}catch(e){console.error(`Error in createOrUpdateVariable: ${e}`)}else console.error("Variables feature is not enabled.")}))}function s(e,n){switch(n){case"COLOR":return function(e){/^#[0-9A-F]{6}$/i.test(e)||console.error(`Invalid hex color: ${e}`);return{r:parseInt(e.substring(1,3),16)/255,g:parseInt(e.substring(3,5),16)/255,b:parseInt(e.substring(5,7),16)/255,a:1}}(e);case"FLOAT":return parseFloat(e);case"BOOLEAN":return"true"===e.toLowerCase();case"STRING":return e.toString();default:return e}}const c="#F9F7FD",l="#111111",d="#0000FF",g="#7938D3",f="#FFFFFF",p="Regular",u="Bold",h=16,m=24,y=16;let A=0;figma.showUI(__html__,{width:320,height:640}),figma.ui.onmessage=e=>{return n=void 0,r=void 0,s=function*(){try{switch(e.type){case"create-wcag-card":yield function(e){return n=this,t=void 0,a=function*(){try{if(!e||!e.ref_id||!e.title)return void console.error("Item data is incomplete:",e);console.log("Loading fonts..."),yield figma.loadFontAsync({family:"Inter",style:u}),yield figma.loadFontAsync({family:"Inter",style:p}),console.log("Fonts loaded.");const n=figma.createComponent();n.name=`${e.ref_id} - ${e.title}`,n.visible=!1;const t=figma.createFrame();t.name=`${e.ref_id} - ${e.title}`,t.layoutMode="VERTICAL",t.primaryAxisSizingMode="AUTO",t.counterAxisSizingMode="AUTO",t.paddingTop=y,t.paddingBottom=y,t.paddingLeft=y,t.paddingRight=y,t.itemSpacing=3,t.fills=[{type:"SOLID",color:o(c)}],t.strokeWeight=1,t.strokes=[{type:"SOLID",color:o("#E3D5F6")}],t.cornerRadius=8,t.clipsContent=!0;const r=yield i(e.ref_id,{fontWeight:u,fontSize:28,color:g,lineHeight:36,autoResize:!0}),a=figma.createFrame();a.layoutMode="HORIZONTAL",a.counterAxisSizingMode="AUTO",a.primaryAxisSizingMode="AUTO",a.paddingLeft=0,a.paddingRight=4,a.paddingTop=4,a.paddingBottom=4,a.cornerRadius=12,a.appendChild(r);const s=yield i(e.level||"",{fontWeight:u,fontSize:h,color:f,lineHeight:m,autoResize:!0}),S=figma.createFrame();S.layoutMode="HORIZONTAL",S.counterAxisSizingMode="AUTO",S.primaryAxisSizingMode="AUTO",S.paddingLeft=8,S.paddingRight=8,S.paddingTop=4,S.paddingBottom=4,S.cornerRadius=4,S.fills=[{type:"SOLID",color:o("#111111")}],S.appendChild(s);const v=yield i(e.version||"",{fontWeight:u,fontSize:h,color:f,lineHeight:m,autoResize:!0}),C=figma.createFrame();C.layoutMode="HORIZONTAL",C.counterAxisSizingMode="AUTO",C.primaryAxisSizingMode="AUTO",C.paddingLeft=8,C.paddingRight=8,C.paddingTop=4,C.paddingBottom=4,C.cornerRadius=4,C.fills=[{type:"SOLID",color:o(g)}],C.appendChild(v);const O=figma.createFrame();O.name="TEXT CONTAINER",O.layoutMode="HORIZONTAL",O.primaryAxisSizingMode="AUTO",O.counterAxisSizingMode="AUTO",O.itemSpacing=10,O.fills=[],O.appendChild(a),O.appendChild(S),O.appendChild(C),t.appendChild(O);const T=yield i(e.title,{fontWeight:u,fontSize:28,color:l,lineHeight:36});t.appendChild(T);const I=yield i(e.description,{fontWeight:p,fontSize:20,color:l,lineHeight:28});t.appendChild(I);const $=yield i(e.url,{fontWeight:p,fontSize:h,color:d,lineHeight:m});if(t.appendChild($),e.references&&e.references.length>0){const n=figma.createFrame();n.name="References Container",n.layoutMode="VERTICAL",n.primaryAxisSizingMode="AUTO",n.counterAxisSizingMode="AUTO",n.paddingTop=y,n.itemSpacing=3,n.clipsContent=!0,n.fills=[{type:"SOLID",color:o(c)}];const r=yield i("References",{fontWeight:u,fontSize:20,color:l,lineHeight:28});n.appendChild(r);for(const t of e.references){const e=yield i(t.title,{fontWeight:u,fontSize:h,color:l,lineHeight:m});n.appendChild(e);const o=yield i(t.url,{fontWeight:p,fontSize:h,color:d,lineHeight:m});n.appendChild(o)}t.appendChild(n)}if(e.notes&&e.notes.length>0){const n=figma.createFrame();n.name="Notes Container",n.layoutMode="VERTICAL",n.primaryAxisSizingMode="AUTO",n.counterAxisSizingMode="AUTO",n.paddingTop=y,n.itemSpacing=3,n.clipsContent=!0,n.fills=[{type:"SOLID",color:o(c)}];const r=yield i("Notes",{fontWeight:u,fontSize:20,color:l,lineHeight:28});n.appendChild(r);for(const t of e.notes){const e=yield i(t.content,{fontWeight:p,fontSize:h,color:l,lineHeight:m});n.appendChild(e)}t.appendChild(n)}if(e.special_cases&&e.special_cases.length>0){const n=figma.createFrame();n.name="Special Cases Container",n.layoutMode="VERTICAL",n.primaryAxisSizingMode="AUTO",n.counterAxisSizingMode="AUTO",n.paddingTop=y,n.itemSpacing=3,n.clipsContent=!0,n.fills=[{type:"SOLID",color:o(c)}];const r=yield i("Special Cases",{fontWeight:u,fontSize:20,color:l,lineHeight:28});n.appendChild(r);for(const t of e.special_cases){const e=yield i(`${t.title}: ${t.description}`,{fontWeight:p,fontSize:h,color:l,lineHeight:m});n.appendChild(e)}t.appendChild(n)}n.appendChild(t),n.resize(t.width,t.height);const z=n.createInstance();z.x=figma.viewport.center.x-z.width/2+A,z.y=figma.viewport.center.y-z.height/2,z.visible=!0,console.log("Instance width:",z.width),figma.currentPage.appendChild(z),A+=z.width+20,n.remove(),console.log("Component instance created and appended to the page, and the original component removed.")}catch(e){console.error("Error in createWcagCard:",e),e instanceof Error?figma.ui.postMessage({type:"error",message:`Error creating WCAG card: ${e.message}`}):figma.ui.postMessage({type:"error",message:`Error creating WCAG card: ${String(e)}`})}},new((r=void 0)||(r=Promise))((function(e,i){function o(e){try{c(a.next(e))}catch(e){i(e)}}function s(e){try{c(a.throw(e))}catch(e){i(e)}}function c(n){var t;n.done?e(n.value):(t=n.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,s)}c((a=a.apply(n,t||[])).next())}));var n,t,r,a}(e.item);break;case"import-files":yield t(e.files);break;default:console.log("Unhandled message type")}}catch(e){!function(e){e instanceof Error?(console.error("Error:",e.message),figma.ui.postMessage({type:"error",message:`Unhandled error: ${e.message}`})):(console.error("Error:",e),figma.ui.postMessage({type:"error",message:`Unhandled error: ${String(e)}`}))}(e)}},new((a=void 0)||(a=Promise))((function(e,t){function i(e){try{c(s.next(e))}catch(e){t(e)}}function o(e){try{c(s.throw(e))}catch(e){t(e)}}function c(n){var t;n.done?e(n.value):(t=n.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}c((s=s.apply(n,r||[])).next())}));var n,r,a,s}})();