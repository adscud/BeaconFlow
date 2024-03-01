import { openDatabase, SQLiteDatabase } from "expo-sqlite";

export class DatabaseService {
  static shared = new DatabaseService();

  private readonly db: SQLiteDatabase;

  constructor() {
    this.db = openDatabase("BeaconFlow.db");
  }
}
