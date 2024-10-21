export const uploadToDb = async (req, res) => {
    console.log("Adding details to DB");
    try {
        const videoDetails = req.body;
        await addVideoDetailsToDB(videoDetails.title, videoDetails.description, videoDetails.author, videoDetails.url);    
        return res.status(200).send("success");
    } catch (error) {
        console.log("Error in adding to DB ", error);
        return res.status(400).send(error);
    }
 }
 