module.exports = {
  responseWithError: (res, message, status, error) => res.status(status).json({ message, error }),
  responseWithoutError: (res, message, status, content) => {
    const response = () => res.status(status).json({ message, error: null, content });
    return response();
  },
};
