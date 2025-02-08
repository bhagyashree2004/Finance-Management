import multer from "multer";

// Configure multer to store the file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
