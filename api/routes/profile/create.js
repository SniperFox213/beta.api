// Importing modules
import datastore from "../../helpers/datastore";

import moment from "moment";
import axios from "axios";

// Exporting function
const handler = (req, res) => {
  datastore(async (client, db) => {
    // Preparing our user object
    // (with most needed values)
    let random = await axios.get("https://randomuser.me/api/");

    random = random.data.results[0];

    let profile = {
      nickname: random.login.username,
      displayName: `${random.name.first} ${random.name.last}`,
      avatar: null,
      created: moment().unix()
    };

    // And now let's insert this document into our
    // database
    await db.collection("profiles").insertOne(profile);
    
    // And now let's create our user token
    let token = {
      uid: profile._id,
      permissions: "*",
      issued: moment().unix()
    };

    await db.collection("tokens").insertOne(token);

    profile.token = token;

    res.end(JSON.stringify(profile));
    client.close();
  });
};

export default handler;