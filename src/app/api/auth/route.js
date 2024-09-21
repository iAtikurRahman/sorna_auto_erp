import { NextResponse } from "next/server";
import db from '../../lib/db_connec';

export async function POST(req) {
    try {
        // Extracting data from the request body
        const { email, password } = await req.json();

        // Check credentials
        if (email === "admin@gmail.com" && password === "admin") {
            return NextResponse.json({
                status: 200,
                success: true,
                token : "iamauserfrompc",
                message: "Login successful",
            });
        } else {
            return NextResponse.json({
                status: 200,
                success: false,
                token: "not a user",
                message: "Login unsuccessful",
            });
        }
    } catch (error) {
        // Handle unexpected errors
        return NextResponse.json({
            status: 500,
            success: false,
            message: "An error occurred during the login process.",
            error: error.message,
        });
    }
}

export async function GET(req) {
    try {
      // Execute the query using await to handle the promise
      const [result] = await db.execute('SELECT * FROM tasks LIMIT 10');
  
      return NextResponse.json({
        status: 200,
        success: true,
        data: result,
        message: "Data retrieved successfully",
      });
  
    } catch (error) {
      // Handle unexpected errors
      return NextResponse.json({
        status: 500,
        success: false,
        message: "An error occurred during the data retrieval process.",
        error: error.message,
      });
    }
  }
