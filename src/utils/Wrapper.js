const { NotFoundError, PermissionError, ValidationError } = require("./Errors");

const wrapper = (func) => {
  return async (req, res) => {
    try {
      await func(req, res);
    } catch (error) {
      console.log(error);

      const statusCode = getStatusCodeForError(error);
      let message = error.message || error.constructor.name;
      if (message.toLowerCase() === "error") {
        message = "Internal Server Error";
      }
      return res
        .status(statusCode || 500)
        .json({ error: message });
    }
  };
};


function getStatusCodeForError(error) {
  switch (error.constructor) {
    case PermissionError:
      return 401;
    case NotFoundError:
      return 404;
    case ValidationError:
      return 400;
  }

  return 500;
}

module.exports = {wrapper, getStatusCodeForError};
