export function displayDialogue(text: string, onDisplayEnd: () => void) {
  // Use the global React dialogue function
  if ((window as any).showDialogue) {
    (window as any).showDialogue(text);
    // Store the callback for when dialogue closes
    (window as any).onDialogueClose = onDisplayEnd;
  }
}

export function setCamScale(k: any) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}
