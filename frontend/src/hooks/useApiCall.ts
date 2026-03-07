import { useState } from "react";
import axios from "axios";

export function useApiCall() {
  const [message, setMessage] = useState("");

  const execute = async (
    apiCall: () => Promise<any>,
    successMessage: string,
    onSuccess?: (data: any) => void,
  ): Promise<void> => {
    setMessage("");
    try {
      const result = await apiCall();
      setMessage(successMessage);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  const clearMessage = () => setMessage("");

  return { execute, message, clearMessage };
}
