export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const queryPrompt = url.searchParams.get("text");
    const prompt = queryPrompt && queryPrompt.trim() !== "" ? queryPrompt : "a vibrant watercolor painting of a cat";
    
    // Default to 4 steps for optimal balance of cost and quality on the free tier
    const steps = parseInt(url.searchParams.get("steps") || "4");

    const inputs = {
      prompt,
      steps: Math.min(Math.max(steps, 1), 8) // Clamp steps between 1 and 8
    };
    
    // Best model for the free tier due to its low neuron cost
    const response = await env.AI.run(
      "@cf/black-forest-labs/flux-1-schnell",
      inputs,
    );
    
    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
