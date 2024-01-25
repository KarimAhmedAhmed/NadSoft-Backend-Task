import { getStatusCodeForError } from "../utils/Wrapper";

export const GlobalErrorHandler = (
  error,
  request,
  response,
  next
) => {
  const statusCode = getStatusCodeForError(error);
  let message = (error).constructor.name;
  if (message.toLowerCase() === "error") {
    message = " Internal Server Error";
  }
  return response
    .status(statusCode || 500)
    .json({ error: error.message || message });
};
