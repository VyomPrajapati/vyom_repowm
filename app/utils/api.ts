export async function generateImage(prompt: string): Promise<string | null> {
    try {
        const response = await fetch("http://localhost:5001/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: prompt }),
        });
 
        const data = await response.json();
        return data.image_url ? `http://localhost:5001${data.image_url}` : null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
}
