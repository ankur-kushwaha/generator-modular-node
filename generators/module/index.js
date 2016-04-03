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

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var appname = path.basename(process.cwd());
    appname = _s.slugify(_s.humanize(appname));

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the incredible ' + chalk.red('RESTify server') + ' generator!'
    ));

    var prompts = [{
      name: 'module',
      message: 'What is module name?',
      validate: function validate(input) {
        return !!input;
      }
    },{
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
      var module=this.props.module.toLowerCase();
      copyTemplateToDest('modules/Book/book-routes.js', parentModule+module+"/"+module+"-routes.js",{
        module:module
      });
      copyTemplateToDest('modules/Book/book-service.js', parentModule+module+"/"+module.toLowerCase()+"-service.js",{
        module:module
      });
    },

  }
});
