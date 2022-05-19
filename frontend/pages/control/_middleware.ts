import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import settings from "../../app/settings";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextApiRequest) {
  const session = await getToken({ req, secret });
  if (!session)
    return NextResponse.redirect(`${settings.PUBLIC_URL}/api/auth/signin`);
  return NextResponse.next();
}
