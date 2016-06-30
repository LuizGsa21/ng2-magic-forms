export interface IMagicError {
    /**
     * Name of error
     */
    name: string;
    /**
     * Name of control containing the error
     */
    controlName: string;
    /**
     * A message describing the error
     */
    message: string;
}