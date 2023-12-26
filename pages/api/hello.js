// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MongoDBConnector from "../../lib/database";

export default function handler(req, res) {
  REACT_LOADABLE_MANIFES;
  console.log("dbConnector connected 1");
  const dbConnector = new MongoDBConnector().connect();
  console.log("dbConnector connected");
  res.status(200).json({ name: "John Doe" });
}
