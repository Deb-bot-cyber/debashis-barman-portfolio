import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { cookies } from "next/headers";

// Authentication helper
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session && session.value === "debashis-admin-token";
}

export async function GET() {
  // Let public read the DB content (needed for live site fetch)
  const db = readDb();
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, data } = body;

    const db = readDb();

    switch (action) {
      case "updateBrandLogos":
        db.brandLogos = data;
        break;
      case "updateTestimonials":
        db.testimonials = data;
        break;
      case "updateSelectedWorks":
        db.selectedWorks = data;
        break;
      case "updateWorksImages":
        db.worksImages = data;
        break;
      case "updateBlogs":
        db.blogs = data;
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const success = writeDb(db);
    if (success) {
      return NextResponse.json({ success: true, db });
    } else {
      return NextResponse.json({ error: "Failed to write database" }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
