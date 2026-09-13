import api from "./axios";

export const uploadAsset = async (file, folder = "media") => {
  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);

  const { data } = await api.post("/uploads", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.asset;
};
