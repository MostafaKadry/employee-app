import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // to Ensure this route is dynamic

async function handleProxyRequest(request) {
  try {
    // Extract the path from the URL (removes '/api/')
    const path = request.nextUrl.pathname.replace("/api/", "");
    const search = request.nextUrl.search;

    // Construct backend URL
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "");
    const backendUrl = `${baseUrl}/api/${path}${search}`;

    console.log(`Proxying ${request.method} to:`, backendUrl);

    // Forward the request to the backend
    const res = await fetch(backendUrl, {
      method: request.method,
      headers: request.headers,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.text(),
    });

    // Handle the response
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend error:", {
        status: res.status,
        error: errorText,
      });
      return NextResponse.json(
        { error: errorText || "Backend request failed" },
        { status: res.status }
      );
    }

    // Return the backend response
    const text = await res.text();
    const headers = new Headers(res.headers);

    // Remove encoding headers that can cause double-decoding
    headers.delete("content-encoding");
    headers.delete("content-length"); // Let it recalculate
    headers.delete("transfer-encoding");
    return new NextResponse(text, {
      status: res.status,
      headers: headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}

// Export handlers for all supported HTTP methods
export const GET = handleProxyRequest;
export const POST = handleProxyRequest;
export const PUT = handleProxyRequest;
export const PATCH = handleProxyRequest;
export const DELETE = handleProxyRequest;
