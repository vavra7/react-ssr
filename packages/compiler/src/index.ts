#!/usr/bin/env node
import { Command } from 'commander';
import 'reflect-metadata';
import { build, start } from './scripts';

const program = new Command();

program.command('build').action(build);
program.command('start').action(start);
program.parse();
