// Importing modules
import datastore from "../../../helpers/datastore";

import { ObjectId } from "mongodb";

// Exporting function
const handler = (req, res) => {
  datastore(async (client, db) => {
    // Let's firstly get some information
    const { id } = req.params;

    // Ending our request if id isn't
    // set
    if (id == null) res.end(JSON.stringify({ error: "WrongPayload" }));
    
    // Firstly let's check if this is
    // a token or no
    let type;
    let response;

    try {
      if (id.includes('$')) {
        // It's a user token
        type      = "token";
        let token = await db.collection("tokens").findOne({ _id: ObjectId(id.replace("$", "")) });

        // Checking token information
        if (token == null) return res.status(400).end(JSON.stringify({ error: "InvalidToken" }));

        // Getting user account
        // and then returning its
        // information
        response  = await db.collection("profiles").findOne({ _id: ObjectId(token.uid) });
        
        // Adding some extra information
        response.isToken = true;
        response.token   = token;
      } else {
        // It's just a user id
        type     = "id";
        response = await db.collection("profiles").findOne({ _id: ObjectId(id) });
      };

      if (response == null) {
        res.status(404).end(JSON.stringify({ error: "NotFound" }));
      } else {
        res.end(JSON.stringify(response));
      };
    } catch(error) {
      res.end(JSON.stringify({ error: "ServerError" }));
    };

    client.close();
  });
};

export default handler;