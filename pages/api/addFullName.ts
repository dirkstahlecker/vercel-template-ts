import { Pool } from "pg/lib";
import { config } from "../../config";
const pool = new Pool(config);

export default async function handler(request, response) {
  const {firstName, lastName, displayName} = request.body;

  const query = `INSERT INTO names.firstlast (displayname, firstname, lastname) 
  SELECT '${displayName}', '${firstName}', '${lastName}' WHERE
  NOT EXISTS (
      SELECT (displayname, firstname, lastname) FROM names.firstlast 
      WHERE displayname='${displayName}' and firstname='${firstName}' and lastname='${lastName}'
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