import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  organization: "org-k8lCqk5UiES92KiqEL18v37w",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      "model": "text-davinci-003",
      "prompt": `${prompt}`,
      "max_tokens": 3000,
      "temperature": 0,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "logprobs": null,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))