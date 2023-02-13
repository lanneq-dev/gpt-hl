import { Configuration, OpenAIApi } from "openai";
import colors from "colors";

class Search {
  constructor(key) {
    this.key = key;
    this.configuration = new Configuration({apiKey: this.key});
    this.openai = new OpenAIApi(this.configuration);
  }

  readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  async run() {
    this.readline.question("> ", async (name) => {
      await this.goGPT(name);
    });
  }

  async goGPT(inputString) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputString,
      max_tokens: 500,
    });
    console.log(`${completion.data.choices[0].text}\n`.green);
    this.run();
  }
}

export default { Search };