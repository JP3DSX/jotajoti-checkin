import clientPromise from "../../../components/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("jotajotijp-dev");

    const posts = await db.collection("playground").find({}).limit(20).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};