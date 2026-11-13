export const CONNECTOR_TOKEN_READY_EVENT = 'connector-token-ready';

export interface AppDataRecord {
  id: string;
  userId: string;
  data: Record<string, any>;
  updatedAt: string;
}