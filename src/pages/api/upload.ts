import { IncomingForm } from "formidable"
import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs/promises"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = new IncomingForm({
        uploadDir: "./public/uploads",
        keepExtensions: true
      })

      form.parse(req, function (err) {
        if (err) {
          throw new Error(err.message)
        }
      })

      form.on("file", (_, file) => {
        fs.rename(file.path, form.uploadDir + "/" + file.name)
      })

      res.json({ message: "file uploaded" })
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong")
    }
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
