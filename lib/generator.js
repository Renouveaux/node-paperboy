var fs = require('fs');
var path = require('path');

var swig = require('swig');
var htmlToText = require('html-to-text');

module.exports = (function () {
  'use strict';

  /**
   * TemplateGenerator constructor.
   *
   * @param {object} options - Render options.
   *   Required: viewPath - The path to the folder which contains your templates.
   *   Optional: [extName=html] - The extension name (ommiting the period);
   *     defaults to 'html'.
   * @constructor
   */
   var TemplateGenerator = function (options) {
    this.viewPath = options.viewPath;
    this.extName = options.extName || 'html';
    this.cidFolder = options.cidFolder ;
  };

   /**
   * Read in the template and render using Swig.
   *
   * @param {object} mail
   * @param {object} callback
   * @api public
   */
   TemplateGenerator.prototype.render = function (mail, callback) {
    var _i, _len;
    var attachments = []

    if (mail.data.html) return cb();

    var file = mail.data.template + '.' + this.extName;
    var templatePath = path.join(this.viewPath, file);

    if(typeof mail.data.attachments !== 'undefined'){
      for(_i = 0, _len = Object.keys(mail.data.attachments).length; _i < _len; _i++){
        attachments.push(mail.data.attachments[_i]);
      }
    }

    if(typeof this.cidFolder != 'undefined'){
      var cidDirectory = path.join(this.viewPath, this.cidFolder);

      fs.readdirSync(cidDirectory).forEach(function (fileName) {
        attachments.push({
          filename: fileName,
          path: cidDirectory + '/' + fileName,
          cid: fileName.substr(0, fileName.lastIndexOf('.'))
        });        
      });
    }

    mail.data.attachments = attachments;

    var template = swig.compileFile(templatePath);

    mail.data.html = template(mail.data.context || {});

    mail.data.text = htmlToText.fromString(mail.data.html, {ignoreImage :true});

    callback();
  };



  TemplateGenerator.prototype.addAttachments = function(html){
    var attachments, _i, _len;
    attachments = this.getAttachments(html);
    if(typeof(this.file) !== 'undefined'){
      for(_i = 0, _len = Object.keys(this.file).length; _i < _len; _i++){
        attachments.push(this.file[_i]);
      }
    }
    return attachments;
  }

  TemplateGenerator.prototype.getAttachments = function(html){
    var attachment, attachments, _i, _len, _ref;
    attachments = [];
    _ref = this.attachments;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attachment = _ref[_i];
      if (html.search("cid:" + attachment.cid) > -1) {
        attachments.push(attachment);
      }
    }
    return attachments;
  };


  return TemplateGenerator;

})();