export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Get prompt from URL query, or use a default
    const queryPrompt = url.searchParams.get("prompt");
    const prompt = queryPrompt && queryPrompt.trim() !== "" ? queryPrompt : "A photorealistic cat sleeping on a windowsill";

    // Define inputs for the model
    // These can be customized via URL parameters as well
    const inputs = {
      prompt: prompt,
      width: 1024,
      height: 1024,
      steps: 25,
      guidance: 7,
      negative_prompt: "blurry, low quality, cartoon, signature"
    };

    // Run the updated image generation model
    const response = await env.AI.run(
      "@cf/leonardo/lucid-origin",
      inputs,
    );

    // Return the response as an image
    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
