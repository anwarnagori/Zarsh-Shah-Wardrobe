const me = async (req, res) => {
  res.json(req.user);
};

export default me;
