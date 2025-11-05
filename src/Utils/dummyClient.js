// src/utils/dummyClient.js
import axios from "axios";

export const getRecs = async (token) => {
  const res = await axios.get("http://localhost:4000/meals/recommendations", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
