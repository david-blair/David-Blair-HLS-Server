

    const request_lib = require('https');
    const fs = require('fs');
    // var ffmpeg = require('fluent-ffmpeg');
    var m3u8ToMp4 = require("m3u8-to-mp4");
    var http = require('http');
    const urlExist = require('url-exist');
    const crypto = require("crypto")







 exports.getVideo = async (req,res , next) => {



    // pull cards matching the sessionID and the SetName
 
    
    var converter = new m3u8ToMp4();

    const query_url = req.query.url;

    if(query_url == undefined)
    {
      res.status(400).send("no url parameter found");
      return next;
    }

    if( !await urlExist(query_url) ) 
    {
      res.status(400).send("invalid url parameter found");
      return next;

    }


    output = "./tmp/" + crypto.createHash('md5').update(query_url).digest('hex')  + ".mp4";
    while(fs.existsSync(output))
    {
      output = "./tmp/" + crypto.createHash('md5').update(output).digest('hex') + ".mp4";
    }



      converter
      .setInputFile(req.query.url)
      .setOutputFile(output)
      .start()
      .then(() => {
        console.log("File converted");
        res.download(output , (err) =>
        {
          console.log
          console.log(fs.existsSync(output))
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