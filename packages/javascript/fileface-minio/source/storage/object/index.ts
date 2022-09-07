// #region imports
    // #region libraries
    import Minio from 'minio';

    import {
        Readable as ReadableStream,
    } from 'stream';
    // #endregion libraries


    // #region external
    import {
        ObjectReadOptions,
        ObjectReadResult,
    } from '../../data/interfaces';
    // #endregion external


    // #region internal
    import clientStore from '../client';
    // #endregion internal
// #endregion imports



// #region module
const store = async (
    bucket: string,
    object: string,
    stream: string | Buffer | ReadableStream,
    size?: number,
    metadata?: Minio.ItemBucketMetadata,
) => {
    try {
        const client = await clientStore.get();
        if (!client) {
            return;
        }

        const result = await client.putObject(
            bucket,
            object,
            stream,
            size,
            metadata,
        );

        return result;
    } catch (error) {
        return;
    }
}



const read = async (
    bucket: string,
    object: string,
    options?: ObjectReadOptions,
): Promise<ObjectReadResult | undefined> => {
    const client = await clientStore.get();
    if (!client) {
        return;
    }

    const handler = (
        error: Error | null,
        dataStream: ReadableStream,
        resolve: (value: ObjectReadResult) => void,
        reject: (reason?: any) => void,
    ) => {
        if (error) {
            reject(error);
            return;
        }

        let size = 0;
        const chunks: Buffer[] = [];

        dataStream.on('data', (chunk) => {
            size += chunk.length;
            chunks.push(chunk);
        });

        dataStream.on('end', () => {
            if (options?.asChunks) {
                const result: ObjectReadResult = {
                    size,
                    data: chunks,
                };
                resolve(result);
                return;
            }

            const encoding = options?.encoding || 'utf8';
            const result: ObjectReadResult = {
                size,
                data: Buffer.concat(chunks).toString(encoding),
            };
            resolve(result);
        });

        dataStream.on('error', (error) => {
            reject(error);
        });
    }

    return await new Promise(
        (resolve, reject) => {
            client.getObject(
                bucket,
                object,
                (error, dataStream) => {
                    handler(
                        error,
                        dataStream,
                        resolve,
                        reject,
                    );
                }
            );
        }
    );
}

const readAsStream = async (
    bucket: string,
    object: string,
) => {
    const client = await clientStore.get();
    if (!client) {
        return;
    }

    const stream = client.getObject(
        bucket,
        object,
    );

    return stream;
}

const readPartial = async (
    bucket: string,
    object: string,
    offset: number,
    length?: number,
): Promise<ObjectReadResult | undefined> => {
    const client = await clientStore.get();
    if (!client) {
        return;
    }

    const handler = (
        error: Error | null,
        dataStream: ReadableStream,
        resolve: (value: ObjectReadResult) => void,
        reject: (reason?: any) => void,
    ) => {
        if (error) {
            reject(error);
            return;
        }

        let size = 0;
        const chunks: Buffer[] = [];

        dataStream.on('data', (chunk) => {
            size += chunk.length;
            chunks.push(chunk);
        });

        dataStream.on('end', () => {
            const result: ObjectReadResult = {
                size,
                data: Buffer.concat(chunks),
            };
            resolve(result);
        });

        dataStream.on('error', (error) => {
            reject(error);
        });
    }

    return await new Promise(
        (resolve, reject) => {
            if (!length) {
                client.getPartialObject(
                    bucket,
                    object,
                    offset,
                    (error, dataStream) => {
                        handler(
                            error,
                            dataStream,
                            resolve,
                            reject,
                        );
                    }
                );
                return;
            }

            client.getPartialObject(
                bucket,
                object,
                offset,
                length,
                (error, dataStream) => {
                    handler(
                        error,
                        dataStream,
                        resolve,
                        reject,
                    );
                }
            );
        }
    );
}



const obliterate = async (
    bucket: string,
    object: string,
) => {
    const client = await clientStore.get();
    if (!client) {
        return;
    }

    await client.removeObject(
        bucket,
        object,
    );

    return true;
}
// #endregion module



// #region exports
const object = {
    store,

    read,
    readAsStream,
    readPartial,

    obliterate,
};


export default object;
// #endregion exports
