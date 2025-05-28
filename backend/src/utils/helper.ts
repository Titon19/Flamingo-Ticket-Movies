export const getAssetUrl = (path: string = "") => {
  const appurl = process.env.APP_URL ?? "";

  return `${appurl}/uploads/${path}/`;
};
