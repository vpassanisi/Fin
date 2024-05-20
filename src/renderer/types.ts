export interface transaction {
  amount: string;
  date: string;
  description: string;
  category: string | null;
}

export interface month {
  name: string;
  value: string;
}

export interface category {
  name: string;
  transactions: transaction[];
}

declare global {
  interface Window {
    electron: {
      writeToDisk: (filepath: string, content: string) => void;
      readFromDisk: (filePath: string) => void;
      onWriteResponse: (callback: (res: { success: boolean; message: string }) => void) => void;
      onReadFromFile: (
        callback: (res: { success: boolean; message: string; data: any }) => void
      ) => void;
    };
  }
}
