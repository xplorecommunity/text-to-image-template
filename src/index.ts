export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const queryPrompt = url.searchParams.get("text");
    const prompt = queryPrompt && queryPrompt.trim() !== "" ? queryPrompt : "cat";
    
    const inputs = {
      prompt,
      width: 1024,
      height: 1024,
    };
    
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
