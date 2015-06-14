var TemplateGenerator = require('./generator');

module.exports = function (options) {
  var generator = new TemplateGenerator(options);

  /**
   * Render the template.
   *
   * @param {object} mail
   * @param {object} callback
   */
  return function (mail, callback) {
    generator.render(mail, callback);
  };
};