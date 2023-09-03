import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("jotajotijp-dev");
    const { id } = req.query;
    const {title, content} = req.body;

    const post = await db.collection("playground").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};