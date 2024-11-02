import OpenAI from "openai"

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const openaiApiKey = config.openaiApiKey

        const body = await readBody(event)
        const { query, image } = body

        // Initialize OpenAI client
        const openai = new OpenAI({
            apiKey: openaiApiKey,
            dangerouslyAllowBrowser: false,
        })

        const externalImage = `https://raw.githubusercontent.com/Imaginario27/scrimba-gpt-4-vision/refs/heads/master/public/images/${image}`
        
        console.log(externalImage)
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        { 
                            type: "text", 
                            text: query
                        },
                        { 
                            type: "image_url",
                            image_url: {
                                url: externalImage,
                            }
                         }
                    ],
                },
            ],
        })

        const output = response.choices[0].message.content

        return { output }
    } catch (error) {
        if (error instanceof Error) {
            
            return { message: `Error: ${error.message}` }
        } else {
            return { message: "An unknown error occurred" }
        }
    }
})
