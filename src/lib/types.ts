export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
