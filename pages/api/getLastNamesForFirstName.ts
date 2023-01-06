import { Pool } from "pg/lib";
import { config } from "../../config";
const pool = new Pool(config);

/**
 * Get all last names for a given first name
 * @param request firstName
 * @param response 
 */
export default async function handler(request, response) {
  const {firstName} = request.body;
  // const query = `SELECT DISTINCT lastname FROM names.firstlast WHERE firstname='${firstName}';`;
  const query = `SELECT lastname FROM names.firstlast WHERE firstname='${firstName}';`;

  try {
    const client = await pool.connect();
    const result = await client.query(query);
    response.json({
      message: result.rows
    });
  } catch (err) {
    response.status(500).json({
      message: err.message
    });
  }
}
