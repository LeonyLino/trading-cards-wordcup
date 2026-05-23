export interface Sticker {
    id: number;
    playerName: string;
    team: string;
    number: string;
    imageUrl: string;
    countryCode: string;
    acronym?: string;

    owned: boolean;
    repeated: boolean;
}