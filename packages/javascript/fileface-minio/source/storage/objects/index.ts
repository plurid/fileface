// #region imports
    // #region external
    import {
        ObjectListItem,
    } from '../../data/interfaces';
    // #endregion external


    // #region internal
    import generateClient from '../client';
    // #endregion internal
// #endregion imports



// #region module
const client = generateClient();


const list = async (
    bucket: string,
    prefix?: string,
    recursive?: boolean,
): Promise<ObjectListItem[] | undefined> => {
    if (!client) {
        return;
    }

    return await new Promise((resolve, reject) => {
        const result = client.listObjects(
            bucket,
            prefix,
            recursive,
        );

        const objects: ObjectListItem[] = [];

        result.on('data', (object) => {
            const {
                name,
                size,
                lastModified,
                etag,
                prefix,
            } = object;

            const objectItem: ObjectListItem = {
                name,
                size,
                lastModified,
                etag,
                prefix,
            };

            objects.push(objectItem);
        });

        result.on('end', () => {
            resolve(objects);
        });

        result.on('error', (error) => {
            reject(error);
        });
    });
}


const obliterate = async (
    bucket: string,
    objects: string[],
) => {
    if (!client) {
        return;
    }

    await client.removeObjects(
        bucket,
        objects,
    );

    return true;
}
// #endregion module



// #region exports
const objects = {
    list,
    obliterate,
};


export default objects;
// #endregion exports
