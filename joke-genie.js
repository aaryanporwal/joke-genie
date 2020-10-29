#!/usr/bin/env node

const yargs = require('yargs');
const axios = require('axios');
const chalk = require('chalk');
const boxen = require('boxen');


const options = yargs
.usage('Usage: -n <name>')
.option('n', { alias: 'name', describe: 'Your name', type: 'string', demandOption: true})
.option('s', { alias: 'search', describe: 'Search term', type: 'string' })
.argv;

// chalk and boxen modules are used to make the console messages look pretty ;)

console.log(boxen('Welcome to Joke Genie!🧞‍♂️', {float: 'center',borderStyle:'bold',borderColor: '#8A2BE2',padding: 1}));


const greeting = `Hello, ${options.name}👋 \n`; 
console.log(chalk.bold.inverse.blue(greeting));


if (options.search) {
    console.log(chalk.yellow(`Searching for jokes about ${options.search}....`));
}else{
    console.log("Here's a random joke for you:");
}

//The url depends on option choosen for searching or for retrieving random joke:
const url = options.search ? `https://icanhazdadjoke.com/search?term=${options.search}` : 'https://icanhazdadjoke.com';

axios.get(url, { headers: { Accept: 'application/json' } })
.then(res => {
    if (options.search) {
        //if searching for jokes, loop over the results, where j is an iterator and \n is a newline character
        res.data.results.forEach(function(j)  {
            console.log('\n' + j.joke); 
        });
        if (res.data.results.length === 0) {
        console.log(chalk.red("Woops no jokes found, try searching with another string "));
        }
    }else{
        console.log(res.data.joke)
    }
})
