export interface Character {
    name: string,
    onSuccessSounds: any[],
    onFailSounds: any[],
    getImageComponent: React.FC<any>,
}
