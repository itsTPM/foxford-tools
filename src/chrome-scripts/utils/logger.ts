const prefix = '[Foxford Tools] ';

export const logger = {
  info: (message: string) => {
    console.log(prefix + message);
  },

  warn: (message: string) => {
    console.warn(prefix + message);
  },

  error: (message: string) => {
    console.error(prefix + message);
  },
};
