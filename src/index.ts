export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const queryPrompt = url.searchParams.get("text");
    const prompt = queryPrompt && queryPrompt.trim() !== "" ? queryPrompt : "cat";

    const inputs = {
      prompt,
    };

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
