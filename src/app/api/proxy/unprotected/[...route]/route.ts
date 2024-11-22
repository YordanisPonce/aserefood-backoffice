const handler = async (
  req: Request,
  { params }: { params: { route: string[] } }
) => {
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_APP_API_URL}` + params.route.join("/"),
      {
        method: req.method,
        headers: {
          ...req.headers,
          "Content-Type": "application/json",
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
};

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
