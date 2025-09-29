import kaboom from "kaboom";

// Initialize Kaboom with a function that gets the canvas element
export const initKaboom = () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }
  
  return kaboom({
    global: false,
    touchToMouse: true,
    canvas: canvas,
    debug: false, // set to false once ready for production
  });
};

export let k: any = null;
