import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("jotajotijp-dev");
    const { title, content } = req.body;

    const post = await db.collection("playground").insertOne({
      title,
      content,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};