export type ChatMessage = {
  user: string;
  text?: string;
  image?: string;
  video?: string;
  audio?: string;
  file?: { name: string; data: string; type: string };
};
