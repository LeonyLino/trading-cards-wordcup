export interface Sticker {
    id: number;
    code: string;
    name: string;
    team?: string;
    imageUrl: string;
    qtd: number;
    selection: string;
    
    owned: boolean;
    repeated: boolean;
}