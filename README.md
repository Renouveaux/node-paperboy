# Paperboy plugin for Nodemailer

Hey, this is a plugin for Nodemail that renders email templates using Ejs. Include in templates works, images and attachments and other stuff to be come in future.
Inspired by [nodemailer-express-handlebars](https://github.com/yads/nodemailer-express-handlebars). Find on [NPM](https://www.npmjs.com/package/node-paperboy).

----------


## Install from NPM
```bash
npm install node-paperboy
```

## Usage
```javascript
var path = require('path');
var paperboy = require('node-paperboy');

var options = {
	viewPath: path.resolve(__dirname, '../path/to/templates'),
	extName: 'ejs',
	cidFolder: 'img'
}

// Use the plugin with the Nodemailer transport instance.
transporter.use('compile', paperboy(options));

var mail = {
	from: 'from@foo.tld',
	to: 'to@foo.tld',
	subject: 'A good Email',
	template: 'TemplateFile.html',
	attachments: [{
		filename: 'test.ogg',
		content: '/where/is/my/file.ogg'
	}]
}

transporter.sendMail(mail, cb);

```

### Plugin Options
The plugin expects the following options:
* __viewPath (required)__ The path to the directory where your templates live.
* __extName (optionnal)__ The extension of the template to use (defaults to 'html').
* __cidFolder (optionnal)__ The folder who content image for template, must be present in same folder of templates

### Mail Options
Set the template and values properties on the mail object before calling `sendMail`
* __template__ The name of the template file to use.
* __context (optionnal)__ The data to pass to your email template.
* __attachments (optionnal)__ An array of attachments file

# License
MIT