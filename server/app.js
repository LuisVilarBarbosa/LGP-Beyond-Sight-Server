const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors());

app.get("/split/:name", async (req, res) => {
	try {
		var exec = require('child_process').exec, child;

		child = exec('pdftk ../app/src/pdf/' + req.params.name + '.pdf burst output ../app/src/pdf/' + req.params.name + '_%02d.pdf',
		  function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
                  console.log('exec error: ' + error);
                  return res.send({response: 'error'});
              }
		});
		return res.send({response: 'success'});
	  } catch (err) {
		return res.status(500).json(err);
	}
});

app.get("/", (req, res) => {
  return res.send();
});

app.listen(3050, () => {
  console.log("Listening on port 3050!");
});
