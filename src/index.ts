import 'reflect-metadata';
import 'dotenv/config';

import HTTPServer from './shared/infra/http/server';
import queueProvider from '@shared/container/providers/QueueProvider';

async function main() {
  await queueProvider.init();

  console.log(process.env.KAFKA_BROKERS);

  console.log('✅ QUEUE PROVIDER INITIALIZED');

  try {
    await queueProvider.producer('test', {
      value: '✅ QUEUE PRODUCER WOKRING! ',
    });
  } catch (error) {
    console.log(error);
    console.log('❌ QUEUE PROVIDER NOT INITIALIZED');
  }

  const server = new HTTPServer();

  const api = await server.init();

  api.listen(process.env.API_PORT, () => {
    console.log(`✅ Server running on port ${process.env.API_PORT}`);
  });
}

main();
