import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { db, todoTable } from "../../lib/drizzle";


export async function GET(request: NextRequest) {
try{
      await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))`;
    //   data niklne k liye db.seclect().from jo hm ne drizzle.ts mai variable nmya h wo likhna h
      const res = await db.select().from(todoTable);
      console.log(res);
      return NextResponse.json({ data: res });
    } catch (err) {
      console.log((err as { message: string }).message);
      return NextResponse.json({ message: "Something went wrong" });
    }
}

export async function POST(request:NextRequest){
    const req = await request.json();
    try {
        if (req.task){
           const res=await db.insert(todoTable).values({
            task:req.task,
           }).returning();
          //  console.log(res)

           return NextResponse.json({message:"Data added successfully",data:res})
        }else{
            throw new Error("Task field is required")
        }

    } catch (error) {
        return NextResponse.json({message: (error as { message:string}).message})

    }
}




/* 
// second data base cart for checking data get and post working or not

// export async function GET(request: NextRequest) {
//   try {
//     let data = await db.select().from(todoTable);
//     return NextResponse.json({ data });
//   } catch (error) {
//     console.log((error as { message: string }).message);
//     return NextResponse.json({ error });
//   }
// }

// export async function POST(req: NextRequest) {
//   let val = await req.json();
//   let data = await db.insert(todoTable).values(val).returning();
//   return NextResponse.json({ data });
// }
*/