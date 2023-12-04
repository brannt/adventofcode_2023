#!/usr/bin/env node

import * as process from 'process';
import * as fs from 'fs';



class Card {
    id: number;
    winningNumbers: Set<string>;
    cardNumbers: Set<string>

    constructor(id: number, winningNumbers: string[], cardNumbers: string[]) {
        this.id = id;
        this.winningNumbers = new Set(winningNumbers);
        this.cardNumbers = new Set(cardNumbers);
    }

    getValue(): number {
        let value = 0;
        this.cardNumbers.forEach((num) => {
            if (num.length > 0 && this.winningNumbers.has(num)) {
                if (value === 0) {
                    value = 1;
                } else {
                    value *= 2;
                }
            }
        });
        return value;
    }

    static fromString(line: string): Card {
        const [card, numbers] = line.split(': ');
        const [winningNumbers, cardNumbers] = numbers.split(' | ');
        const id = parseInt(card.split(' ')[-1]);
        return new Card(id, winningNumbers.split(' '), cardNumbers.split(' '));
    }
}


function main(input: string): void {
    // Read input file
    const data = fs.readFileSync(input, 'utf8');
    const lines = data.split('\n');
    let sum = 0;
    for (let line of lines) {
        if (line === '') {
            continue;
        }
        const card = Card.fromString(line);
        // console.log(card);
        sum += card.getValue();
        // console.log(sum);
    }
    console.log(sum);
}

const args = process.argv.slice(2);
const input = args[0];

main(input);
