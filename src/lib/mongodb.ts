import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** 서버리스 환경에서 커넥션을 재사용하기 위해 전역에 캐시한다. */
export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local).");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 실패한 연결은 캐시하지 않는다 → 다음 요청에서 다시 시도
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export type ClickDoc = {
  linkId: string;
  count: number;
  updatedAt: Date;
};

let indexEnsured = false;

export async function getClicksCollection() {
  const client = await getMongoClient();
  const col = client.db(process.env.MONGODB_DB || "linknamu").collection<ClickDoc>("clicks");
  if (!indexEnsured) {
    await col.createIndex({ linkId: 1 }, { unique: true });
    indexEnsured = true;
  }
  return col;
}
