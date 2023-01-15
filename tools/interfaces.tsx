import { AVPlaybackSource } from "expo-av/build/AV.types";

export interface Character {
    name: string,
    onSuccessSounds: Generator<AVPlaybackSource>,
    onFailSounds: any[],
    getImageComponent: React.FC<any>,
}
