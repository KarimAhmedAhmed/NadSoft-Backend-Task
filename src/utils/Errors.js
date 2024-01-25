class PermissionError extends Error {}
class NotFoundError extends Error {}
class ValidationError extends Error {}
class DatabaseError extends Error {}

module.exports = {
  PermissionError,
  NotFoundError,
  ValidationError,
  DatabaseError
};
