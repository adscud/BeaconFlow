import { openDatabase } from "expo-sqlite";

const db = openDatabase("BeaconFlow.db");

export { db };
