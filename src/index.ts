export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const queryPrompt = url.searchParams.get("text");
    const prompt = queryPrompt && queryPrompt.trim() !== "" ? queryPrompt : "a beautiful cat sitting in a garden";
    
    // Optional parameters you can add for better control
    const height = parseInt(url.searchParams.get("height") || "1024");
    const width = parseInt(url.searchParams.get("width") || "1024");
    const steps = parseInt(url.searchParams.get("steps") || "20");
    const guidance = parseFloat(url.searchParams.get("guidance") || "7.5");
    
    const inputs = {
      prompt,
      height: Math.min(Math.max(height, 256), 2048), // Clamp between 256-2048
      width: Math.min(Math.max(width, 256), 2048),   // Clamp between 256-2048
      num_steps: Math.min(Math.max(steps, 1), 20),   // Max 20 steps
      guidance: Math.min(Math.max(guidance, 1), 20), // Reasonable guidance range
    };
    
    try {
      const response = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs,
      );
      
      return new Response(response, {
        headers: {
          "content-type": "image/png",
          "cache-control": "public, max-age=3600", // Cache for 1 hour
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Image generation failed", details: error.message }), 
        {
          status: 500,
          headers: { "content-type": "application/json" },
        }
      );
    }
  },
} satisfies ExportedHandler<Env>;
