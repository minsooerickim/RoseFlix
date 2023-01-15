/* eslint-disable import/no-anonymous-default-export */
const OpenAI = require('openai-api')
const openai = new OpenAI(process.env.OPENAI_API_KEY)

export default async (
  req: { body: { name: any }; search: any },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: { text: string }): void; new (): any }
    }
  }
) => {
  //   let prompt = `Artist ${req.search}\n\nLyrics:\n`
  const userPrompt = req.body.name
  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: userPrompt,
    maxTokens: 50,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0.5,
    bestOf: 1,
    n: 1,
  })

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` })
}
