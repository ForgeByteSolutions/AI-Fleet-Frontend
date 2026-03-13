import axiosInstance from "./axiosInstance";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data; // must return doc_id
};

export const getDocumentStatus = async (docId) => {
  const response = await axiosInstance.get(
    `/documents/${docId}/status`
  );

  return response.data;
};

export const listDocuments = async () => {
  const response = await axiosInstance.get("/documents/");
  return response.data;
};

export const deleteDocument = async (docId) => {
  const response = await axiosInstance.delete(`/documents/${docId}`);
  return response.data;
};