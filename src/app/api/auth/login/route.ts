import { NextResponse } from "next/server";

const AUTH_TOKEN = process.env.ADMIN_AUTH_TOKEN;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
    try {
        if (!AUTH_TOKEN || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Authentication is not configured" }, { status: 500 });
        }

        const body = await request.json();
        const username = body.username?.trim();
        const password = body.password?.trim();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const response = NextResponse.json({ success: true });
            
            // Set secure HttpOnly cookie
            response.cookies.set({
                name: 'mb_auth_token',
                value: AUTH_TOKEN,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });

            return response;
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (e) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
