import db from "../app/global/db";

beforeAll(async () => {
    return db.initialize();
});

afterAll(async () => {
    const entities = db.entityMetadatas;

    for (const entity of entities) {
        await db.getRepository(entity.name).clear();
    }

    return db.destroy();
});
