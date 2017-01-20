var http = require('https');
var fs = require('fs');
var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yeoman = require("yeoman-generator")
var yosay = require("yosay")

module.exports = class extends yeoman {

    constructor(args, opts) {
        super(args, opts);
    }

    init() {
        this.log(yosay('Lets pack up that package!'));
        this.templatedata = {};
    }

    _downloadNugetExe() {
        const nugetUrl = "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe"
        var file = fs.createWriteStream(this.destinationPath('nuget.exe'));
        var request = http.get(nugetUrl, function(response) {
            response.pipe(file);
        });
    }

    writing() {
            //this._downloadNugetExe();
            
            const spawn = require('child_process').spawn;
            const nuget = spawn(this.destinationPath('nuget.exe'), ['pack']);

            nuget.stdout.setEncoding('utf8');
            nuget.stderr.setEncoding('utf8');
            
            nuget.stdout.on('data', (data) => {
                console.log(data);
            });

            nuget.stderr.on('data', (data) => {
                console.log(data);
            });

            nuget.on('exit', (code) => {
                console.log(`Child exited with code ${code}`);
            });
        }
};

