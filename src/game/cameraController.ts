// Camera and viewport management
import { setCamScale } from '../utils';

export const setupCamera = (k: any, player: any) => {
  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.worldPos().x, player.worldPos().y - 100);
  });
};
