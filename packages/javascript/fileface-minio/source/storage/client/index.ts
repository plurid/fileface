// #region imports
    // #region libraries
    import Minio from 'minio';
    // #endregion libraries


    // #region external
    import {
        MINIO_END_POINT,
        MINIO_PORT,
        MINIO_ACCESS_KEY,
        MINIO_SECRET_KEY,
    } from '../../data/constants';
    // #endregion external
// #endregion imports



// #region module
let client: Minio.Client | null;

const generateClient = () => {
    try {
        if (client) {
            return client;
        }

        client = new Minio.Client({
            endPoint: MINIO_END_POINT,
            port: MINIO_PORT,
            accessKey: MINIO_ACCESS_KEY,
            secretKey: MINIO_SECRET_KEY,
            useSSL: false,
        });

        return client;
    } catch (error) {
        console.log('Could not generate Minio client.', error);
        return;
    }
}
// #endregion module



// #region exports
export default generateClient;
// #endregion exports
