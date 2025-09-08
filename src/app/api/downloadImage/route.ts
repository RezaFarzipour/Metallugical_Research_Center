// app/api/downloadImage/route.ts
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "image/jpeg",
                "Content-Disposition": 'attachment; filename="receipt.jpg"',
            },
        });
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}
