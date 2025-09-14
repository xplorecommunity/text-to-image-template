// This is the recommended and working code for the free tier
export default {
  async fetch(request, env) {
    // Ensure you have the AI binding in your wrangler.toml file
    if (!env.AI) {
      return new Response("AI binding not configured.", { status: 500 });
    }

    const url = new URL(request.url);
    const queryPrompt = url.searchParams.get("text");
    const prompt = queryPrompt && queryPrompt.trim() !== "" ? queryPrompt : "a photo of a cat astronaut riding a horse on the moon";

    const inputs = {
      // Only the prompt is required for this model
      prompt,
    };

    try {
      const response = await env.AI.run(
        // This is the best model for quality and free tier usage
        "@cf/black-forest-labs/flux-1-schnell",
        inputs,
      );

      return new Response(response, {
        headers: {
          "content-type": "image/png",
        },
      });

    } catch (e) {
      // Return a descriptive error if the AI model fails
      return new Response(`Error running AI model: ${e.message}`, { status: 500 });
    }
  },
} satisfies ExportedHandler<{ AI: Ai }>;
