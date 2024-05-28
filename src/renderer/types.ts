export interface transaction {
  id: string;
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

export interface policy {
  matches: string;
  result: string;
}

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
      };
    };
  }
}
