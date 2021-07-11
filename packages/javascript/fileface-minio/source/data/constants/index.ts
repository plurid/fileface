// #region module
export const MINIO_END_POINT = process.env.MINIO_END_POINT || '';
export const MINIO_PORT = parseInt(process.env.MINIO_PORT || '') || 9000;
export const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || '';
export const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || '';
// #endregion module
