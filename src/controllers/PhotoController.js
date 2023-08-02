class PhotoController {
  async store(req, res) {
    try {
      return res.json('ok');
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

const photoControllerInstance = new PhotoController();
export default photoControllerInstance;
