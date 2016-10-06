var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
    prompting: function() {
        var questions = [{
                type: 'input',
                name: 'projectname',
                message: 'Name of your package',
                default: this.appname
            },
            {
                type: 'input',
                name: 'version',
                message: 'Your sitecore version',
                default: '8.2.160729'
            }, 
            {
                type: 'input',
                name: 'id',
                message: 'The id of the nuget package',
                default: 'Sitecore.Full'
            },
            {
                type: 'input',
                name: 'authors',
                message: 'Package authors',
                default: 'Kickass people'
            }];

        var done = this.async();
        this.prompt(questions).then(function(answers) {
            this.props = answers;
            this.log('Project name: ' + answers.projectname);
            this.log('Sitecore version: ' + answers.version);
            this.log('NuGet package id: ' + answers.id);           
            this.log('Package Auhtors: ' + answers.authors);            
            done();
        }.bind(this));
    },
    writing: {
        config: function () {
            this.fs.copyTpl(
                this.templatePath('_package.nuspec'),
                this.destinationPath(this.props.projectname + '.nuspec'), {
                    version: this.props.version,
                    destinationRoot: this.destinationRoot(),
                    authors: this.props.authors,
                    id: this.props.id
                }
            );
            mkdirp.sync('website');
            mkdirp.sync('data')
        },
    },
});