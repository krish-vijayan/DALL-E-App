import { Configuration, OpenAIApi } from "openai";
import { config } from "../Utils/config";

export const fetchImage = async (prompt: string) => {
  const configuration = new Configuration({
    apiKey: config.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const res = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "512x512",
    });
    console.log(res.data.data[0].url);
    return res.data.data[0].url;
  } catch (error) {
    return error;
  }
};
