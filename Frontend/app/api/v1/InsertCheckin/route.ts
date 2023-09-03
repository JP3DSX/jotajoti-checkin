import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import moment from "moment";

export async function POST(request: Request) {
  var res = {
    message: "",
    body: {},
  };
  const data = await request.json();
  try {
    console.log(data);
    let utcDate=moment(new Date()).utc();
    data.data.InsertDate = utcDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    delete data.data._id;

    const client = await MongoClient.connect(
      "mongodb://hoge:huga@localhost:27017/jotajotijp-dev?retryWrites=true&w=majority"
    );
    const db = client.db();
    const yourCollection = db.collection("check-ins");

    const result = await yourCollection.insertOne(data.data);

    console.log(result);
    client.close();

    res.message = "Data inserted successfully!";
    res.body = data;
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      res.message = error.message;
      res.body = data;
      return NextResponse.json(res, { status: 500 });
    }
    throw new Error("Failed in InsertCheckin");
  }
}
