#!/usr/bin/env node

import * as process from 'process';
import * as fs from 'fs';

function main(input: string): void {
    // Read input file
    const data = fs.readFileSync(input, 'utf8');
    const lines = data.split('\n');
    //print sum (getCalibrationValue)
    let sum = 0;
    for (let line of lines) {
        if (line === '') {
            continue;
        }
        sum += getCalibrationValue(line);
    }
    console.log(sum);
}

const DIGITS = {
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
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9
}

function getCalibrationValue(line: string): number {
    let first: number = 0, last: number =0;
    // Consider all up to 5-character substrings of the line
    let originalLine = line;
    let i = 0;
    while (i < line.length) {
        let substring = line.substring(i, Math.min(i + 5, line.length));
        for (let digit in DIGITS) {
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

const args = process.argv.slice(2);
const input = args[0];

main(input);
