"use server";
import { ContactInfo, ContactInfoDetails } from "../types/contactInfo";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

const contactInfosPath = "contact-infos";
const contactInfosSearchPath = "/search";
const contactInfosAdminPath = "/backoffice";
const contactInfosTag = "contact-infos";

export const getContactInfos = async (
  params: SearchParams,
  userId: string
): Promise<Paginated<ContactInfo>> => {
  const query: IQueryable = buildQueryParams(params);
  query.municipalityId = params.municipalityId;

  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}${
      contactInfosPath + contactInfosSearchPath + contactInfosAdminPath
    }/` + userId
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [contactInfosTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching contact infos");
  }

  return await response.json();
};

export const getContactInfo = async (
  contactInfoId: string
): Promise<ContactInfoDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${
      contactInfosPath + contactInfosAdminPath
    }/${contactInfoId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching contact info");
  }

  return await response.json();
};
