import { Principal } from "@dfinity/principal";

export const unwrapResult = <T, E>(
  result: { Ok: T } | { Err: E }
): Promise<T> => {
  return new Promise(
    (resolve: (value: T) => void, reject: (error: E) => void) => {
      if ("Ok" in result) {
        resolve(result.Ok);
      } else {
        reject(result.Err);
      }
    }
  );
};


export const replacer = (key: any, value: any) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
  
    // we have quite a few places where we use Principal, so we format it to text
    if (value instanceof Principal) {
      return value.toText();
    }
  
    // in case we receive an error, we want tp get its contents
    if (value instanceof Error) {
      return value.toString();
    }
  
    return value;
  };
  
  /**
   * Serializes an object into a JSON string
   * If the object includes BigInt, it will be converted to a string
   * @param jsonObject - The object to be serialized.
   * @return string.
   */
  
  export const stringifyJson = (jsonObject: unknown) => {
    if (typeof jsonObject === 'string') return jsonObject;
    if (jsonObject instanceof Error) return jsonObject.toString();
  
    return JSON.stringify(jsonObject, replacer);
  };