

const fs = require('fs');
const urlExist = require('url-exist');
const crypto = require("crypto")
const child_process = require('child_process');






// main function to get request
exports.getVideo = async (req,res , next) => {

    // save the query url
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

    // define ffmpeg process to download the hls resource, piping the output to the processes standard out
    let ffmpeg = child_process.spawn("ffmpeg",[
        "-probesize","2500000000",
        "-analyzeduration","2500000000",
        "-i", query_url,
        "-vcodec","copy",
        "-f", "mp4",       
        '-bsf:a' ,'aac_adtstoasc' ,     
        "-movflags","frag_keyframe+empty_moov+faststart",
        "-frag_duration","3600",
        "pipe:1"              
    ]);   

    

    // make variable to store bytes, I have implimented this a different way by just doing ffmpeg.stdout.pipe(res), but this lead to pipe blocks occasionally, 
    // was not good for error checking, and didn't let me return a content length
    var file = [];

    // add the output data to the array
    ffmpeg.stdout.on('data' , (data) => file.push(data));
    
    // after the process is done, check the exit code, if it exited with not a 0 the resource was invalid 
    ffmpeg.on('close',  (code) => {
     if(code != 0)
     {

        res.status(400).send("no file at url parameter found");
        res.end();
     }
     else{
       // if the code was 0, concatenate the array into a buffer, get the size, and write it to the resopnse
      const buffer = Buffer.concat(file);
      const conLength = buffer.length;

      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'video/mp4',
        'Content-Length' : conLength,
        'Connection': 'keep-alive',
        'Content-Disposition' : 'attatchment; filename=video.mp4',

        

      });
      res.write(buffer)
   

    }

 
    });
    return next;


  



}

