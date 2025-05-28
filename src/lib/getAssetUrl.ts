export const getAssetUrl = (relativePath: string): string => {
  const isProd = process.env.NODE_ENV === "production";

  const basePath = isProd ? "https://assets.sco-yuna.kr" : "/photo";

  return `${basePath}/${relativePath}`;
};
