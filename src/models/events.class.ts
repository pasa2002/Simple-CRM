export interface CustomCalendarEvent {
  id?: string | number;  // Allow both string and number types for id
  start: Date;
  end?: Date;
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  allDay?: boolean;
  reminder?: boolean;
  description?: string;
}
