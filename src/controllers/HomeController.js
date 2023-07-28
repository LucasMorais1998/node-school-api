class HomeController {
  index(req, res) {
    res.json({
      hello: 'world!',
    });
  }
}

const homeControllerInstance = new HomeController();
export default homeControllerInstance;
