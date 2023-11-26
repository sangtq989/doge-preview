export interface Doge {
    id: string;
    name: string;
    kind: string;
}

export interface DogePageResponse {
    nextPageToken: string;
    files: File[];
}
