var yeoman = require("yeoman-generator")
var yosay = require("yosay")
var mkdirp = require('mkdirp');

module.exports = class extends yeoman {

    constructor(args, opts) {
        super(args, opts);
    }

    init() {
        this.log(yosay('Lets generate that package!'));
        this.templatedata = {};
    }

    askForProjectSettings() {
        var questions = [{
                type: 'input',
                name: 'projectname',
                message: 'Name of your package',
                default: this.appname
            },
            {
                type: 'input',
                name: 'version',
                message: 'Your package version',
                default: '1.0.0'
            }, 
            {
                type: 'input',
                name: 'id',
                message: 'The id of the nuget package',
                default: this.appname + ".package"
            },
            {
                type: 'input',
                name: 'authors',
                message: 'Package authors',
                default: 'Kickass people'
            }];

        var done = this.async();
        this.prompt(questions).then(function(answers) {
            this.settings = answers;
            this.log('Project name: ' + answers.projectname);
            this.log('Sitecore version: ' + answers.version);
            this.log('NuGet package id: ' + answers.id);           
            this.log('Package Auhtors: ' + answers.authors);    
            this._buildTemplateData();
            done();
        }.bind(this));

    }

    _buildTemplateData() {
        this.templatedata.projectname = this.settings.projectname;
        this.templatedata.version = this.settings.version;
        this.templatedata.id = this.settings.id;
        this.templatedata.authors = this.settings.authors;
        this.templatedata.destinationRoot = this.destinationRoot();
    }

    writing() {
            this.fs.copyTpl(this.templatePath('_package.nuspec'), this.destinationPath(this.settings.projectname + '.nuspec'), this.templatedata);
            mkdirp.sync('website');
            mkdirp.sync('data');
        }
};

