// #region imports
    // #region libraries
    import Minio from 'minio';
    // #endregion libraries


    // #region external
    import {
        MINIO_GENERATION_TIMEOUT,
        MINIO_END_POINT,
        MINIO_PORT,
        MINIO_ACCESS_KEY,
        MINIO_SECRET_KEY,
    } from '../../data/constants';

    import {
        ClientData,
    } from '../../data/interfaces';
    // #endregion external
// #endregion imports



// #region module
class Client {
    private client: Minio.Client | null = null;
    private generationTimeout: NodeJS.Timeout;

    constructor() {
        this.generationTimeout = setTimeout(() => {
            this.generate();
        }, MINIO_GENERATION_TIMEOUT);
    }

    public generate(
        clientData?: ClientData,
    ) {
        if (this.generationTimeout) {
            clearTimeout(this.generationTimeout);
        }

        this.client = new Minio.Client({
            endPoint: clientData?.endPoint || MINIO_END_POINT,
            port: clientData?.port || MINIO_PORT,
            accessKey: clientData?.accessKey || MINIO_ACCESS_KEY,
            secretKey: clientData?.secretKey || MINIO_SECRET_KEY,
            useSSL: clientData?.useSSL ?? false,
        });

        return client;
    }

    public async get() {
        if (!this.client && this.generationTimeout) {
            await new Promise((resolve) => {
                setTimeout(() => resolve(true), MINIO_GENERATION_TIMEOUT + 100);
            });
        }

        return this.client;
    }
}

const client = new Client();
// #endregion module



// #region exports
export default client;
// #endregion exports
