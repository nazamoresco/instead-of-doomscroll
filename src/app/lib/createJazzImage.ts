
import { Account, Group } from 'jazz-tools';
import { createImage } from 'jazz-tools/media';

export type CreateJazzImageOptions = {
  owner?: Group | Account;
  placeholder?: "blur" | false;
  maxSize?: number;
  progressive?: boolean;
};

export async function createJazzImage(canvas: HTMLCanvasElement | null, options: CreateJazzImageOptions = {}) {
    if (!canvas) return;
    const dataUrl = canvas?.toDataURL();
    if (!dataUrl) return;

    const blob = await (await fetch(dataUrl)).blob();
    const image = await createImage(
        blob,
        {
            owner: options.owner,
            maxSize: options.maxSize,
            progressive: options.progressive
        }
    );
    return image;
}
