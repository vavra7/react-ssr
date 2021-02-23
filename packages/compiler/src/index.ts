#!/usr/bin/env node
import 'reflect-metadata';

import { Command } from 'commander';

import { build, start } from './scripts';

const program = new Command();

program.command('build').action(build);
program.command('start').action(start);
program.parse();
