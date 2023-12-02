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
var DIGITS = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
};
function getCalibrationValue(line) {
    var first = 0, last = 0;
    // Consider all up to 5-character substrings of the line
    // Replace any of the digits with their word equivalent
    var originalLine = line;
    var i = 0;
    while (i < line.length) {
        var substring = line.substring(i, Math.min(i + 5, line.length));
        // Replace any of the digits with their word equivalent
        for (var digit in DIGITS) {
            if (substring.startsWith(digit)) {
                if (first === 0) {
                    first = DIGITS[digit];
                }
                last = DIGITS[digit];
            }
        }
        i++;
    }
    console.log(originalLine, first * 10 + last);
    return first * 10 + last;
}
var args = process.argv.slice(2);
var input = args[0];
main(input);
