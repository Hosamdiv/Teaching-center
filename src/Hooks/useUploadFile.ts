import { useMutation } from "@tanstack/react-query";
import { axiosApi } from "../config/axiosApi";

interface UploadParams {
  file: File;
  title: string;
  description: string;
  price: string;
  type: "video" | "pdf";
}

interface UploadResponse {
  message: string;
  fileUrl?: string;
}


export const useUploadFile = () => {
  return useMutation<UploadResponse, Error, UploadParams>({
    mutationFn: async ({ file, title, description, price, type }) => {
      const formData = new FormData();
      formData.append("file", file);

      // بناء رابط الـ query params
      const query = new URLSearchParams({
        title,
        description,
        price,
        type,
      }).toString();

      const response = await axiosApi.post(`/api/upload?${query}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
  });
};
