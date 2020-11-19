
exports.errorHandling = func => {
    return async function (req, res, next) {
      try {
        await func(req, res, next);
      } catch (e) {
        next(e);
      }
    };
  };