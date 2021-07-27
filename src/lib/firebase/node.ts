import * as admin from "firebase-admin"

const serviceAccount = require("./service-account.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export default admin
