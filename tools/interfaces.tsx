export interface Character {
    name: string,
    onSuccessSounds: Array<any>,
    onFailSounds: Array<any>,
    getImageComponent: React.FC<any>,

}
