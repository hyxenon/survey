import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL || "your_mongodb_connection_string";
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('survey-db');
    const collection = database.collection('surveyresponses');
    const responses = await collection.find({}).toArray();
    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch survey responses' }, { status: 500 });
  } finally {
    await client.close();
  }
}
