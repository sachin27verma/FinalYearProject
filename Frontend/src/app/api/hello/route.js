
import { NextResponse } from "next/server";

export async function GET(req)
{
    try {
            return NextResponse.json({ message: "Hello from the API" });
    } catch (error) {
        console.log("Eroor in api calling");
    }
}