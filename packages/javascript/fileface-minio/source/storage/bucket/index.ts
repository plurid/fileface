// #region imports
    // #region internal
    import clientStore from '../client';
    // #endregion internal
// #endregion imports



// #region module
const exists = async (
    name: string,
) => {
    try {
        const client = await clientStore.get();
        if (!client) {
            return;
        }

        const result = await client.bucketExists(
            name,
        );

        return result;
    } catch (error) {
        return;
    }
}


const generate = async (
    name: string,
    region?: string,
) => {
    try {
        const client = await clientStore.get();
        if (!client) {
            return;
        }

        region = region || 'eu-east-1';

        await client.makeBucket(
            name,
            region,
        );

        return true;
    } catch (error) {
        return;
    }
}


const obliterate = async (
    name: string,
) => {
    try {
        const client = await clientStore.get();
        if (!client) {
            return;
        }

        await client.removeBucket(
            name,
        );

        return true;
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
const bucket = {
    exists,
    generate,
    obliterate,
};

export default bucket;
// #endregion exports
