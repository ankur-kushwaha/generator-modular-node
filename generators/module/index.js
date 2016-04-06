/* global process:true */

'use strict';
var yeoman = require('yeoman-generator'),
  path = require('path'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  _s = require('underscore.string'),
  pkg = require('../../package.json');

function copyIdenticalPathsBase(path, context) {
  copyTemplateToDestBase.call(this, path, path, context);
}

function copyTemplateToDestBase(templatePath, destPath, context) {
  if (context) {
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destPath),
      context
    );
  } else {
    this.fs.copy(
      this.templatePath(templatePath),
      this.destinationPath(destPath)
    );
  }
}
var glob=require('glob');
var path=require('path');
function getModules(){
	//var srcpath=process.cwd()+"/routes";
  return glob.sync('modules/**/');
}

module.exports = yeoman.Base.extend({
  constructor: function () {
      yeoman.Base.apply(this, arguments);

      // This makes `appname` a required argument.
      this.argument('module', { type: String, required: true });
      // And you can then access it later on this way; e.g. CamelCased
      this.module = _s.camelize(this.module);
    },
  prompting: function() {
    var done = this.async();

    var appname = path.basename(process.cwd());
    appname = _s.slugify(_s.humanize(appname));

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the incredible ' + chalk.red('Module Node') + ' generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'parentModule',
      message: 'Specify the parent module name',
      default: 'modules/',
      choices: getModules()
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var copyTemplateToDest = copyTemplateToDestBase.bind(this);
      var parentModule=this.props.parentModule
      var moduleName=this.module;
      copyTemplateToDest('modules/Book/book-routes.js', parentModule+moduleName+"/"+moduleName+"-routes.js",{
        module:moduleName
      });
      copyTemplateToDest('modules/Book/book-service.js', parentModule+moduleName+"/"+moduleName+"-service.js",{
        module:moduleName
      });
    },

  }
});
