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
                value += 1;
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
    const lines = data.split('\n').filter((line) => line !== '');
    let sum = 0;
    // total cards: array of 1 for each line
    let totalCards = new Array(lines.length).fill(1);
    for (let i = 0; i < lines.length; i++) {
        const card = Card.fromString(lines[i]);
        const value = card.getValue();
        for (let j = i + 1; j < i + value + 1; j++) {
            totalCards[j] += totalCards[i];
        }
        // console.log(totalCards);
    }
    console.log(totalCards.reduce((a, b) => a + b, 0));
}

const args = process.argv.slice(2);
const input = args[0];

main(input);
