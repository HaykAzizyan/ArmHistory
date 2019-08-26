export const CHECK_MAX_LENGTH = (len: number = 40) => {
    return (str: string = "") => str.trim().length <= len;
  };

export const CHECK_MIN_LENGTH = (len: number = 1) => {
    return (str: string = "") => str.trim().length >= len;
  };



export const IS_NOT_EMPTY = (str) => str.trim().length > 0;

export const CHECK_REGULAR_EXPRESSION = (someRegExp) => (str: string) => someRegExp.test(str);