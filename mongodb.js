const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://ardmin:8127027@cluster0.u68butj.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
    createListing(client, {
      name: "Dario",
      lastName: "Hoyos",
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

//create documents in MongoDb
async function createListing(client, newListing) {
  client.db("Users").collection("NewUsers").insertOne(newListing);
  console.log("testing");
}

async function listDatabases(client) {
  const databaseList = await client.db().admin().listDatabases();

  console.log("Databases");
  databaseList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
