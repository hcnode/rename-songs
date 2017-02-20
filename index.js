#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');

program
  .version('0.0.1')
  .parse(process.argv);

require('./rename')

