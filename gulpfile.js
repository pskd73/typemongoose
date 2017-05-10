var gulp = require("gulp");
var colors = require("colors");
var exec = require("child_process").exec;
var path = require("path");

function out (string) {
    var formattedTime = (new Date()).toTimeString().split(" ")[0];
    console.log("["+formattedTime.gray+"] "+string);
}

function lint() {
    return new Promise(function(resolve, reject) {
        exec("npm run lint", function(err, stdout, stderr){
            if (!stderr) {
                out("Compiled Lint".blue);
                resolve();
            } else {
                out("Error in Lint".red);
                reject(stdout);
            }
        });
    });
}

function tsc() {
    return new Promise(function(resolve, reject) {
        exec("npm run build", function(err, stdout, stderr){
            if (!stderr) {
                out("Compiled Build".blue);
                resolve();
            } else {
                out("Error in Build".red);
                reject(stdout);
            }
        });
    });
}

function runCompilation() {
    out("Compiling scripts..".yellow);
    return lint()
        .then(tsc)
        .then(function(){
            return new Promise(function(resolve, reject) {
                out("Compiling scripts done.".green);
            });
        })
        .catch(function(err){
            console.log(err);
        });
}

gulp.task("watch-typescript", function(){
    runCompilation();
    gulp.watch("src/**/*.ts", function(event) {
        runCompilation();
    });
});

gulp.task("default", ["watch-typescript"]);
