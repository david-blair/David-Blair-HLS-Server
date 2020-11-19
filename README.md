"# David-Blair-HLS-Server" 

This is David Blair's implimentation of an HLS server. The server uses Node.Js, particulalry the express package for it. There is one route the server listens to which is GET /.

GET / should have one paramater, url, which contains a url to a valid hls. If so, the application will return an mp4 download of the resource at the url. If not you will be returned an error clarifying what was wrong.

Setup:
Install packages with npm install

Run program with npm start 

By default the server listens to port 9000. This can be changed in index.js

There are two versions of the server, one using a temp folder and one without. To switch between the versions one needs to switch which controller is required in HLS/hls.router.js. For using a temp folder, require ./hls.controller.js, for the other version require ./hls-stream.controller.js.

Testing:
You can run 4 unit tests on either version to ensure it is working properly by running npm test after installing with npm install. 

