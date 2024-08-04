import Recording from "../models/Recording.js";

const createNewRecording = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    const { user, title, scriptText, cueWord } = req.body;
    const actorAudioPath = req.files.actorAudio[0].location;
    const readerAudioPath = req.files.readerAudio[0].location;

    const recording = new Recording({
      user,
      title,
      scriptText,
      cueWord,
      actorAudioPath,
      readerAudioPath,
    });

    await recording.save();
    res.status(201).json(recording);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find();
    res.status(200).json(recordings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createNewRecording, getAllRecordings };
