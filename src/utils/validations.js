export const validationMessages = {
  invalidEmail: 'Invalid email.',
  uniqueEmail: 'Email already exists.',
  uniqueCourse: 'The course is already registered in the system.',
  required: (fieldName) => `${fieldName} is required.`,
  len: (fieldName, min, max) => `${fieldName} needs to have between ${min} and ${max} characters.`,
  invalidString: (fieldName) => `${fieldName} must be a valid string.`,
  positiveInteger: (fieldName) => `${fieldName} must be a valid positive whole number.`,
  positiveNonNegativeNumber: (fieldName) => `${fieldName} must be a valid non-negative number.`,
};

const throwValidationError = (message) => {
  throw new Error(message);
};

const validateRequired = (value, fieldName) => {
  if (!value) throwValidationError(validationMessages.required(fieldName));
};

export const validateString = (value, fieldName) => {
  validateRequired(value, fieldName);
  if (typeof value !== 'string') {
    throwValidationError(validationMessages.invalidString(fieldName));
  }
};

export const validatePositiveInteger = (value, fieldName) => {
  validateRequired(value, fieldName);
  if (!Number.isInteger(value) || value < 0) {
    throwValidationError(validationMessages.positiveInteger(fieldName));
  }
};

export const validatePositiveNonNegativeNumber = (value, fieldName) => {
  validateRequired(value, fieldName);
  if (!Number.isFinite(value) || value < 0) {
    throwValidationError(validationMessages.positiveNonNegativeNumber(fieldName));
  }
};
