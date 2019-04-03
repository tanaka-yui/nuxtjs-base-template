#!/usr/bin/env node
/* -*- mode: javascript -*- */
/* vi: set ft=javascript : */

/**
 * @fileOverview Copy .env file from /envs to project root
 */
const path = require('path')
const fs = require('fs-extra')

const filename = process.argv[2]

const from = path.resolve(__dirname, '..', 'envs', `${filename}.env`)
const to = path.resolve(__dirname, '..', '.env')

console.info(`[setupenv]: copy '${from}' to '${to}'`) // eslint-disable-line no-console

fs.createReadStream(from).pipe(fs.createWriteStream(to))
