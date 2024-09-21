import { NextResponse } from "next/server";
import db from '../../../lib/db_connec';

export async function POST(req) {
  try {
    // Extract data from the request body
    const {
      employee_id,
      access_role,
      name,
      email,
      picture,
      phone,
      alternative_phone,
      emergency_number,
      designation,
      division,
      district,
      thana,
      country,
      address,
      dob,
      nid,
      nid_picture,
      marital_status,
      bb_routing_no,
      bank_account_name,
      bank_account_no,
      is_active,
      is_deleted,
      updated_by,
      created_by
    } = await req.json();

    // Construct the SQL query for inserting a new user
    const query = `
      INSERT INTO users (
        employee_id,
        access_role,
        name,
        email,
        picture,
        phone,
        alternative_phone,
        emergency_number,
        designation,
        division,
        district,
        thana,
        country,
        address,
        dob,
        nid,
        nid_picture,
        marital_status,
        bb_routing_no,
        bank_account_name,
        bank_account_no,
        is_active,
        is_deleted,
        updated_by,
        created_by,
        updated_at,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    // Execute the query
    const [result] = await db.execute(query, [
      employee_id,
      access_role,
      name,
      email,
      picture,
      phone,
      alternative_phone,
      emergency_number,
      designation,
      division,
      district,
      thana,
      country,
      address,
      dob,
      nid,
      nid_picture,
      marital_status,
      bb_routing_no,
      bank_account_name,
      bank_account_no,
      is_active,
      is_deleted,
      updated_by,
      created_by
    ]);

    return NextResponse.json({
      status: 201,
      success: true,
      message: "User created successfully",
      userId: result.insertId, // Returning the ID of the newly created user
    });
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json({
      status: 500,
      success: false,
      message: "An error occurred while creating the user.",
      error: error.message,
    });
  }
}

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page"), 10) || 1;
      const limit = parseInt(searchParams.get("limit"), 10) || 10;
      const offset = (page - 1) * limit;
  
      // Ensure limit and offset are numbers
      if (isNaN(limit) || isNaN(offset)) {
        throw new Error("Invalid pagination parameters");
      }
  
      const query = `
        SELECT 
          employee_id, access_role, name, email, picture, phone, alternative_phone, 
          emergency_number, designation, division, district, thana, country, address, 
          dob, nid, nid_picture, marital_status, bb_routing_no, bank_account_name, 
          bank_account_no, is_active, is_deleted, updated_by, created_by, updated_at, created_at
        FROM users
        LIMIT ? OFFSET ?
      `;
  
      // Use db.query() instead of db.execute()
      const [rows] = await db.query(query, [limit, offset]);
  
      return NextResponse.json({
        status: 200,
        success: true,
        members: rows, // Changed to 'members' to match the frontend expectation
      });
    } catch (error) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "An error occurred while fetching users.",
        error: error.message,
      });
    }
  } 

export async function PUT(req) {
    try {
      // Extract the user ID from the request parameters
      const { searchParams } = new URL(req.url);
      const userId = parseInt(searchParams.get("id"));
  
      // Extract data from the request body
      const {
        employee_id,
        access_role,
        name,
        email,
        picture,
        phone,
        alternative_phone,
        emergency_number,
        designation,
        division,
        district,
        thana,
        country,
        address,
        dob,
        nid,
        nid_picture,
        marital_status,
        bb_routing_no,
        bank_account_name,
        bank_account_no,
        is_active,
        is_deleted,
        updated_by
      } = await req.json();
  
      // Construct the SQL query for updating the user by ID
      const query = `
        UPDATE users
        SET 
          employee_id = ?,
          access_role = ?,
          name = ?,
          email = ?,
          picture = ?,
          phone = ?,
          alternative_phone = ?,
          emergency_number = ?,
          designation = ?,
          division = ?,
          district = ?,
          thana = ?,
          country = ?,
          address = ?,
          dob = ?,
          nid = ?,
          nid_picture = ?,
          marital_status = ?,
          bb_routing_no = ?,
          bank_account_name = ?,
          bank_account_no = ?,
          is_active = ?,
          is_deleted = ?,
          updated_by = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
  
      // Execute the query
      const [result] = await db.execute(query, [
        employee_id,
        access_role,
        name,
        email,
        picture,
        phone,
        alternative_phone,
        emergency_number,
        designation,
        division,
        district,
        thana,
        country,
        address,
        dob,
        nid,
        nid_picture,
        marital_status,
        bb_routing_no,
        bank_account_name,
        bank_account_no,
        is_active,
        is_deleted,
        updated_by,
        userId
      ]);
  
      if (result.affectedRows === 0) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "User not found",
        });
      }
  
      return NextResponse.json({
        status: 200,
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      // Handle unexpected errors
      return NextResponse.json({
        status: 500,
        success: false,
        message: "An error occurred while updating the user.",
        error: error.message,
      });
    }
  }
  
export async function DELETE(req) {
    try {
      // Extract the user ID from the request parameters
      const { searchParams } = new URL(req.url);
      const userId = parseInt(searchParams.get("id"));
  
      // Construct the SQL query for deleting the user by ID
      const query = `
        DELETE FROM users WHERE id = ?
      `;
  
      // Execute the query
      const [result] = await db.execute(query, [userId]);
  
      if (result.affectedRows === 0) {
        return NextResponse.json({
          status: 404,
          success: false,
          message: "User not found",
        });
      }
  
      return NextResponse.json({
        status: 200,
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      // Handle unexpected errors
      return NextResponse.json({
        status: 500,
        success: false,
        message: "An error occurred while deleting the user.",
        error: error.message,
      });
    }
  }
   
