// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
*/

import {pool} from '../../config/cnxBD';

export default async function handler(req, res) {
  const [rows] = await pool.query("SELECT NOW()");
  res.status(200).json({ result: rows[0]["NOW()"] });
}