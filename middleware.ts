import { NextResponse, type NextRequest } from "next/server";

const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedOrigins: ["http://localhost:5173"], // Add your Vite dev server URL
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
  ],
  exposedHeaders: [],
  maxAge: 86400, // 24 hours
  credentials: true,
};

export function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });

    const origin = request.headers.get("origin") ?? "";
    if (
      corsOptions.allowedOrigins.includes("*") ||
      corsOptions.allowedOrigins.includes(origin)
    ) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    response.headers.set(
      "Access-Control-Allow-Credentials",
      corsOptions.credentials.toString()
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      corsOptions.allowedMethods.join(",")
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      corsOptions.allowedHeaders.join(",")
    );
    response.headers.set(
      "Access-Control-Max-Age",
      corsOptions.maxAge?.toString() ?? ""
    );

    return response;
  }

  // Handle actual requests
  const response = NextResponse.next();

  const origin = request.headers.get("origin") ?? "";
  if (
    corsOptions.allowedOrigins.includes("*") ||
    corsOptions.allowedOrigins.includes(origin)
  ) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set(
    "Access-Control-Allow-Credentials",
    corsOptions.credentials.toString()
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsOptions.allowedMethods.join(",")
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(",")
  );
  response.headers.set(
    "Access-Control-Expose-Headers",
    corsOptions.exposedHeaders.join(",")
  );

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
