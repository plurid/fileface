// #region module
export interface ObjectReadOptions {
    asChunks?: boolean;
    encoding?: 'utf8' | 'ascii' | 'utf-8' | 'utf16le' | 'ucs2'
        | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';
}

export interface ObjectReadResult {
    size: number;
    data: any;
}


export interface ObjectListItem {
    name: string;
    size: number;
    lastModified: Date;
    etag: string;
    prefix: string;
}
// #endregion module
