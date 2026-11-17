import { NextResponse } from "next/server";
import { linkIds } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let linkId: unknown;
  try {
    // sendBeacon은 Content-Type이 다를 수 있으므로 text로 받아서 파싱
    const body = JSON.parse(await req.text());
    linkId = body?.linkId;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof linkId !== "string" || !linkIds.has(linkId)) {
    return NextResponse.json({ error: "Unknown linkId" }, { status: 400 });
  }

  try {
    const col = await getClicksCollection();
    await col.updateOne(
      { linkId },
      { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true },
    );
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[clicks] POST failed", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const col = await getClicksCollection();
    const docs = await col
      .find({}, { projection: { _id: 0, linkId: 1, count: 1, updatedAt: 1 } })
      .toArray();
    return NextResponse.json({ clicks: docs });
  } catch (err) {
    console.error("[clicks] GET failed", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
