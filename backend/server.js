import app from "./src/app.js";

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
    console.log(`✅ API running on port ${PORT}`);
});
