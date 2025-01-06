import { UpdateZelleConfDTO, ZelleConf } from "../types/zelleConf";
import { fetchWithAuth } from "../utils/fetcher";

const zelleConfPath = "zelle-conf";
const zelleConfTag = "zelle-conf";

export const getZelleConf = async (): Promise<ZelleConf> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${zelleConfPath}`,
    {
      next: {
        tags: [zelleConfTag],
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 404) {
      throw new Error("No existe zelle conf aún");
    } else throw new Error("Error fetching zelle conf");
  }

  return await response.json();
};

export const updateZelleConf = async (
  zelleConf: UpdateZelleConfDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${zelleConfPath}`,
    {
      method: "PATCH",
      body: JSON.stringify(zelleConf),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);

    if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating zelle conf");
  }
};
