import media from "./media.json";
import musicMedia from "./music-media.json";
import cerimonialMedia from "./cerimonial-media.json";

type Photograph = {
  width: number;
  height: number;
  files: { src: string; width: number; height: number; bytes: number }[];
};

export const photographs: Record<string, Photograph | undefined> = {
  ...media,
  ...musicMedia,
  ...cerimonialMedia,
};
