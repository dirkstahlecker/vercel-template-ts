import { Pool } from "pg/lib";
import { config } from "../../config";
const pool = new Pool(config);

export default async function handler(request, response) {
  const {firstName, lastName} = request.body;
  const query = `INSERT INTO names.firstlast (firstname, lastname) VALUES ('${firstName}', '${lastName}');`;

  try {
    const client = await pool.connect();
    await client.query(query);
    response.json({
      message: "Success!"
    });
  } catch (err) {
    response.status(500).json({
      message: err.message
    });
  }
}