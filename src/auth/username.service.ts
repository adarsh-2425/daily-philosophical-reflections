import { Injectable } from '@nestjs/common';

const philosophers = [
    'Socrates',
    'Plato',
    'Aristotle',
    'Confucius',
  ];

@Injectable()
export class UsernameService {
    generateUsername(): string {
        const randomPhilospher = philosophers[Math.floor(Math.random() * philosophers.length)];
        return randomPhilospher.replace(/\s/g, ''); // remove spaces
    }
}