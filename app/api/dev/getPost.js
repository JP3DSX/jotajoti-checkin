import clientPromise from "../../../components/mongodb";
import { ObjectId} from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("jotajotijp-dev");
    const {id} = req.query;

    const post = await db.collection("playground").findOne({
        _id: ObjectId(id),
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};