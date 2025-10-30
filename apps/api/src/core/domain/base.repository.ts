export interface BaseRepository<T> {
  findById(id: string, fields?: string[]): Promise<T | null>;
  findAll(fields?: string[]): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
