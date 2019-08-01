// importing the server config
import "@babel/polyfill";
import app from "./app";

// importing the database file
import './db'

// starting the server
async function main() {
  try {
    await app.listen(app.get("port"));

    console.log(`server on port ${app.get("port")}`);
  } catch (error) {
    //   if an error ocurred

    console.error(error);
  }
}

main();
