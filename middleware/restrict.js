function restrict() {
  const authError = {
    message: "Make sure you're logged in"
  };

  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
