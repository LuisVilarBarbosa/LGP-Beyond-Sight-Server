const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors());

app.get("/split/:name", async (req, res) => {
	let numberPages = null;
	let error = false;
	
	  try {
		var exec = require('child_process').exec, child;

		child = exec('pdftk ' + req.params.name + ' dump_data | grep NumberOfPages',
		  function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			  console.log('exec error: ' + error);
			  error = true;
			}
			else
			{
				 numberPages = stdout.substring(stdout.lastIndexOf(": ")+1,stdout.lastIndexOf("\n"));
				 numberPages = numberPages.split(' ').join('');
				 
				 if(!error)
	{
		try{
		child = exec('pdftk ' + req.params.name + ' burst output ' + req.params.name + '_%02d.pdf',
		  function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			  console.log('exec error: ' + error);
			  return res.send({response: 'error'});
			}
		});
		return res.send({response: 'success', pages: numberPages});
	  } catch (err) {
		return res.status(500).json(err);
	  }
	}
			}
		});
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
