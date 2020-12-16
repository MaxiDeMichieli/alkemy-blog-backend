module.exports = {
  withError: (res, message, status, error) => res.status(status).json({ message, error }),
  withoutError: (res, message, status, content) => {
    const response = () => res.status(status).json({ message, error: null, content });
    return response();
  },
};
