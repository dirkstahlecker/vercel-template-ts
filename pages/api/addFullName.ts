import { Pool } from "pg/lib";
import { config } from "../../config";
const pool = new Pool(config);

export default async function handler(request, response) {
  const {firstName, lastName} = request.body;
  // const query = `INSERT INTO names.firstlast (firstname, lastname) VALUES ('${firstName}', '${lastName}');`;

  //experimenting with inserting if not exists
  const query = `INSERT INTO names.firstlast (firstname, lastname) SELECT '${firstName}', '${lastName}' WHERE
  NOT EXISTS (
      SELECT (firstname, lastname) FROM names.firstlast WHERE firstname='${firstName}' and lastname='${lastName}'
  );`
  
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    response.json({
      message: result
    });
  } catch (err) {
    response.status(500).json({
      message: err.message
    });
  }
}