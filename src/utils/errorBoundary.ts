import {
  isProtocolError,
  ProtocolError
} from "@metacall/protocol";

// Utility function to safely execute an asynchronous function and handle errors without crashing the server. 
// It distinguishes between protocol errors and other types of errors, providing more informative error messages.
export async function safeExecute<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {

    if (isProtocolError(err)) {
      const protocolErr = err as ProtocolError;
      throw new Error(JSON.stringify({
        type: "ProtocolError",
        message: protocolErr.message,
        code: protocolErr.code
      }));
    }

    if (err instanceof Error) {
      throw new Error(JSON.stringify({
        type: "RuntimeError",
        message: err.message
      }));
    }

    throw new Error(JSON.stringify({
      type: "UnknownError"
    }));
  }
}