export declare function commandExists(command: string): Promise<boolean>;
export declare function commandExists(command: string, callback: (error: Error | null, result: boolean) => void): void;
