#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var fs = require("fs");
function main(input) {
    // Read input file
    var data = fs.readFileSync(input, 'utf8');
    var lines = data.split('\n');
    //print sum (getCalibrationValue)
    var sum = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line === '') {
            continue;
        }
        sum += getCalibrationValue(line);
    }
    console.log(sum);
}
function getCalibrationValue(line) {
    var first, last;
    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
        var char = line_1[_i];
        // test char is numeric
        if (char >= '0' && char <= '9') {
            if (first === undefined) {
                first = parseInt(char);
            }
            last = parseInt(char);
        }
    }
    return first * 10 + last;
}
var args = process.argv.slice(2);
var input = args[0];
main(input);
