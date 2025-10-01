// Map loading and collision setup
import { dialogueData, scaleFactor } from '../constants';
import { displayDialogue } from '../utils';

export const loadMap = async (k: any) => {
  console.log('Loading map data...');
  const mapData = await (await fetch("/labroom.json")).json();
  console.log('Map data loaded:', mapData);
  
  const layers = mapData.layers;
  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
  console.log('Map sprite added:', map);

  return { map, layers };
};

export const setupCollisions = (k: any, map: any, player: any, layers: any[]) => {
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialogue(
              dialogueData[boundary.name as keyof typeof dialogueData],
              () => (player.isInDialogue = false)
            );
          });
        }
      }
      continue;
    }

    if (layer.name === "spawn points") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }
};
