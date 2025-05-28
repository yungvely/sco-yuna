export const getAssetUrl = (relativePath: string): string => {
  const basePath =
    process.env.NEXT_PUBLIC_ENV === "production"
      ? "https://assets.sco-yuna.kr"
      : "/photo";

  return `${basePath}/${relativePath}`;
};
