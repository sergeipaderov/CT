const handleLike = async (cat, url, apiKey) => {
  if (cat.id) {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ image_id: cat.id, value: 1 }),
      });
    } catch (error) {
      console.error("Error posting vote:", error);
    }
  }
};

export default handleLike;
