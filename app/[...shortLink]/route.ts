import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function GET(request: NextRequest, { params }: { params: Promise<{ shortLink: string[] }> }) {
    const { shortLink: slugArray } = await params;
    const slug = slugArray.join("/");

    const linkRequest = await fetch(`https://go.bsb.dev/${slug}`, {
        headers: {
            ...request.headers,
            "X-Real-IP": request.headers.get("Cf-Connecting-Ip") || ""
        }
    });

    return Response.redirect(linkRequest.url);
}