import { BASE_URL } from "@/constants/urls";
import axios from "axios";

export async function getUserInfo(userId) {
    const url = `${BASE_URL}/users/${userId}`;
    const { data } = await axios.get(url);
    return data;
  }