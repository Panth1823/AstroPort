import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

const RESUME_PATH = join(process.cwd(), "Panth_Resume.pdf");

export async function GET() {
  try {
    const file = await readFile(RESUME_PATH);

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Panth_Resume.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Resume PDF not found." },
      { status: 404 }
    );
  }
}