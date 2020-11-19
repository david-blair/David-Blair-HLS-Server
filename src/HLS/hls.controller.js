
    const fs = require('fs');
    var m3u8ToMp4 = require("m3u8-to-mp4");

    const urlExist = require('url-exist');
    const crypto = require("crypto")







 exports.getVideo = async (req,res , next) => {

 
    // define converter 
    var converter = new m3u8ToMp4();

    const query_url = req.query.url;

    // check if it exists, if not, return error
    if(query_url == undefined)
    {
      res.status(400).send("no url parameter found");
      return next;
    }
    // check if url is an actual url
    if( !await urlExist(query_url) ) 
    {
      res.status(400).send("invalid url parameter found");
      return next;

    }

    // hash the url to get the output file
    output = "./tmp/" + crypto.createHash('md5').update(query_url).digest('hex')  + ".mp4";
    // if the output file exists from a currently active request, re-hash the new output
    // continue until an unused file exists
    while(fs.existsSync(output))
    {
      output = "./tmp/" + crypto.createHash('md5').update(output).digest('hex') + ".mp4";
    }


      // use the converter to convert the output to the temp file
      converter
      .setInputFile(req.query.url)
      .setOutputFile(output)
      .start()
      .then(() => {
        console.log("File converted");
        // after conversion use expresses download to download the file
        res.download(output , (err) =>
        {
          // callback after download to destroy the temp file and return status code
          if(fs.existsSync(output))
          {
            fs.unlinkSync(output)
          }

          
        res.status(200);
        res.end();
        return next;

        }  
        
        );



      }).catch((err) => {
        console.log("ERROR")
        console.log(err.message)
        if(err.message.includes("Invalid data found when processing input"))
        {
          res.status(400).send("no file at url parameter found");
          return next;
        }
        else{
          res.status(500).send("Error on conversion");
          return next;
        }

      });



    


     return next;

  };