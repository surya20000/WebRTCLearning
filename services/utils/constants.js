import dotenv from "dotenv";
dotenv.config();

export const port = process.env.BACKEND_PORT || 5000;
export const backendURI = process.env.BACKEND_CONNECTIONURI || "";
