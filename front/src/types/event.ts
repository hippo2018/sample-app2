export type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  created_at?: string;
  updated_at?: string;
};


export type EventInput = {
  title: string;
  date: string;
  description: string;
};
