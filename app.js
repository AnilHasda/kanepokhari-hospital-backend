
import app from "./src/server/server.js";
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`App is listnening on port: ${port}`);
});