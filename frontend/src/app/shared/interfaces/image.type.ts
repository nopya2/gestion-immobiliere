export interface Image {
    id?: number;
    '@id'?: string;
    filename: string;
    extension: string;
    size: number;
    url: string;
    oldUrl?: string;
    filePath?: string;
}