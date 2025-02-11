import {
  Controller,
  RemoveFromStageParams,
  getSessionFromReq,
} from "@/lib/controller";


export async function POST(req: Request) {
  const controller = new Controller();

  try {

    const reqBody = await req.json();
    await controller.startRecording(reqBody.room_name, reqBody.trackID);

    // return Response.json({});
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}
