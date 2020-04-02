const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const axios = require('axios');

const path = './package.json';
try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload.repository.url, undefined, 2);
  const { payload }= github.context;
  const { url } = payload.repository;
  axios.get(`${url}/package.json`)
  .then( res => console.log(JSON.stringify(res)))
  .catch(error => console.log(JSON.stringify(error)));
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}