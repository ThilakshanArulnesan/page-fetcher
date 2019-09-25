const request = require('request');
const fs = require(`fs`);

const URL = process.argv[2];
const localFilePath = process.argv[3];

const readLine = require(`readline`);

const write = function() {


  request(`${URL}`, (error, response, body) => {

    /*
    response --> Response from the server which contains a status code (200 = OK, everything else is bad, refer to codes online)
    error --> Prints error name (e.g. 404  would have an error 'not found;)
    bordy --> Contains the HTML (output from server)

    */

    // Checks if the URL exists (valid page). 200 status = OK
    if (response.statusCode !== 200) {
      console.log(`Hey there's an issue with the URL`);
      //rl.close();
      return;
    }


    fs.writeFile(localFilePath, body, { flag: 'wx' }, (error) => {
      if (error) { //Is there some issue with the write?
        if (error.code === 'EEXIST') { //is it that the file already exists?


          const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          rl.question("This file already exists, would you like to overwrite? Press 'y' for yes.   > ", (answer) => {
            if (answer === "y") {
              fs.writeFile(localFilePath, body, (error) => {
                console.log("done!");
              });
            }

            rl.close();
          })

        } else {

          console.log(error); //I don't know what's wrong, spit it out instead
          // rl.close();
        }

      }
    });
  });

}

// /makeRequest();

write();
