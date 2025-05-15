import { Controller, CreateStreamParams } from "@/lib/controller";

// TODO: validate request with Zod

export async function POST(req: Request) {
  const controller = new Controller();
  console.log("i am router");
 
  try {
    const reqBody = await req.json();

    const response = await controller.createStream(
      reqBody as CreateStreamParams
    );

    return Response.json(response);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      
      return new Response(err.message, { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}
