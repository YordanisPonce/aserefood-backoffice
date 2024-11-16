import { fetchWithAuth } from "../utils/fetcher";

export const getProfile = async (username: string): Promise<unknown> => {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_APP_API_URL}/api/profiles/${username}`
    );

    if (!response.ok) {
      throw new Error("Error fetching profile");
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};
