import { AVPlaybackSource } from "expo-av/build/AV.types";

export interface Character {
    name: string,
    onSuccessSounds: Generator<AVPlaybackSource>,
    getImageComponent: (key: number, onPress: Function, hide: boolean) => React.FC<any>,
}
