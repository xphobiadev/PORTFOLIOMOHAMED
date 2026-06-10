import { NextResponse } from "next/server";

function env(name: string) {
    return process.env[name];
}

export async function POST(request: Request) {
    try {
        const authToken = env("ADMIN_AUTH_TOKEN");
        const adminUsername = env("ADMIN_USERNAME");
        const adminPassword = env("ADMIN_PASSWORD");

        if (!authToken || !adminUsername || !adminPassword) {
            return NextResponse.json({ error: "Authentication is not configured" }, { status: 500 });
        }

        const body = await request.json();
        const username = body.username?.trim();
        const password = body.password?.trim();

        if (username === adminUsername && password === adminPassword) {
            const response = NextResponse.json({ success: true });
            
            // Set secure HttpOnly cookie
            response.cookies.set({
                name: 'mb_auth_token',
                value: authToken,
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
