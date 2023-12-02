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

function getCalibrationValue(line: string): number {
    let first: number, last: number;
    for (let char of line) {
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

const args = process.argv.slice(2);
const input = args[0];

main(input);
