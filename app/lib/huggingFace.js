import axios from 'axios'

export const getSentimentAnalysis = async (text) => {
  const API_KEY = process.env.HUGGING_FACE_TOKEN // Store your API key in .env
  const SENTIMENT_MODEL = 'distilbert-base-uncased-finetuned-sst-2-english' // or another model of your choice
  const API_URL = `https://api-inference.huggingface.co/models/${SENTIMENT_MODEL}`

  try {
    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      },
    )

    // Process the response to find the dominant sentiment
    const sentiments = response.data[0] // Access the inner array
    const dominantSentiment = sentiments.reduce((prev, current) =>
      prev.score > current.score ? prev : current,
    )

    return {
      label: dominantSentiment.label,
      score: dominantSentiment.score,
    }
  } catch (error) {
    if (error.response?.status === 503) {
      // Retry after 5 seconds if the model is warming up
      await new Promise((resolve) => setTimeout(resolve, 5000))
      return getSentimentAnalysis(text)
    }
    throw error // Re-throw other errors
  }
}
