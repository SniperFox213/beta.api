// Importing modules
import datastore from "../../helpers/datastore";

import { ObjectId } from "mongodb";

// Exporting function
const handler = (req, res) => {
  datastore(async (client, db) => {
    // Let's preapre some configuration
    // data
    let response;
    let params = req.query || {};

    try {
      let contentTypes = ["formula", "theory"];
      let type = params.type || contentTypes;

      if (type.includes(',')) {
        type = type.split(',');
      };
      
      // Checking types of our content
      if (typeof type == "object") {
        type = type.filter((x) => contentTypes.includes(x));

        if (type.length <= 0) type = contentTypes;
      } else {
        if (!contentTypes.includes(type)) type = contentTypes
      };

      // Building our query object
      let query  = {
        type: typeof type == "object" ? { $in: type } : type
      };

      if (params.after != null) query._id = { $gt: ObjectId(params.after) };
      
      // And now let's make this request
      let cursor = await db.collection("library")
        .find(query)
        .limit(params.size == null ? 6 : parseInt(params.size) || 6);

      response = await cursor.toArray();
    } catch (error) {
      res.status(500).send({ error: "ServerError" });
      client.close();
      return;
    };
    
    // Closing client connection
    res.send(response);
    client.close();
  });
};

export default handler;