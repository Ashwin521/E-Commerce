import axios from "axios";

export const getFeaturedProducts = async () => {
  const res = await axios.get("http://localhost:5000/api/featured");
  return res.data;
};
