import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { GptAbstract } from './gpt.abstract';

@Injectable()
export class OpenAiIntegration extends GptAbstract {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createHistoryDetails(): Promise<{
    title: string;
    description: string;
    category: string;
  }> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k-0613',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente de criação de histórias. Gere uma história com os seguintes elementos: Title: ... Description: ... Category: ...',
        },
        { role: 'user', content: 'Generate a story for me.' }, 
      ],
      temperature: 0.7,
      max_tokens: 150,
    });
    const generatedText = response.choices[0].message.content;
    const parts = generatedText.split(/Description:|Category:/);
    const title = parts[0].trim();
    const description = parts[1].trim();
    const category = parts[2].trim();
    return { title, description, category };
  }
}
