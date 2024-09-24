import { Message } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = req.url;
  const voiceId =
    req.nextUrl.searchParams.get("voice_id") ?? "mCQMfsqGDT6IDkEKR20a"; // Default voice ID : 21m00Tcm4TlvDq8ikWAM :: jeevan : mCQMfsqGDT6IDkEKR20a
  const message: Message = await req.json();
  const start = Date.now();

  let text = message.content;

  text = text
    .replaceAll("¡", "")
    .replaceAll("https://", "")
    .replaceAll("http://", "")
    .replaceAll(".com", " dot com")
    .replaceAll(".org", " dot org")
    .replaceAll(".co.uk", " dot co dot UK")
    .replaceAll(/```[\s\S]*?```/g, "\nAs shown on the app.\n")
    .replaceAll(
      /([a-zA-Z0-9])\/([a-zA-Z0-9])/g,
      (match, precedingText, followingText) => {
        return precedingText + " forward slash " + followingText;
      }
    );

  const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  return await fetch(elevenLabsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Xi-Api-Key": process.env.ELEVENLABS_API_KEY || "",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    }),
  })
    .then(async (response) => {
      const headers = new Headers();
      headers.set("X-ElevenLabs-Latency", `${Date.now() - start}`);
      headers.set("Content-Type", "audio/mpeg");

      if (!response?.body) {
        return new NextResponse("Unable to get response from ElevenLabs API.", {
          status: 500,
        });
      }

      return new NextResponse(response.body, { headers });
    })
    .catch((error: any) => {
      return new NextResponse(error?.message || "An error occurred", {
        status: 500,
      });
    });
}
