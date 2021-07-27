import { NextApiRequest, NextApiResponse } from "next"
import { promises as fs } from "fs"
import readLine from "readline"
import google from "googleapis"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = "token.json"

  try {
  } catch (error) {
    console.log(error.messsage)
    res.send("Something went wrong")
  }
}
