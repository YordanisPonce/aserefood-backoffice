import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const handler = async (
  req: Request,
  { params }: { params: { route: string[] } }
) => {
  // get the next-auth token
  const token = await getToken({
    req: req as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) {
    try {
      const backendResponse = await fetch(
        `${process.env.NEXT_APP_API_URL}` + params.route.join("/"),
        {
          method: req.method,
          headers: {
            ...req.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}` //send the access token
          },
          body: req.body,
          duplex: "half",
        } as RequestInit
      );

      const data = await backendResponse.json();

      return new Response(JSON.stringify({ data }), {
        status: backendResponse.status, // same status Api
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  } else
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
};

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
