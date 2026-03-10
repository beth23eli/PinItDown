import os
import pika
import time

class RabbitMQService:
    def __init__(self):
        self.user = os.getenv('RABBITMQ_USER', 'user')
        self.password = os.getenv('RABBITMQ_PASSWORD', 'password')
        self.host = os.getenv('RABBITMQ_HOST', 'rabbitmq')
        self.port = int(os.getenv('RABBITMQ_PORT', 5672))
        self.connection = None
        self.channel = None
        self._connect_with_retry()

    def _connect_with_retry(self, retries=12, delay=2):
        last_err = None
        for _ in range(retries):
            try:
                credentials = pika.PlainCredentials(self.user, self.password)
                params = pika.ConnectionParameters(
                    host=self.host,
                    port=self.port,
                    credentials=credentials,
                    heartbeat=30,
                    blocked_connection_timeout=30,
                    connection_attempts=1
                )
                self.connection = pika.BlockingConnection(params)
                self.channel = self.connection.channel()
                return
            except Exception as e:
                last_err = e
                time.sleep(delay)
        raise RuntimeError(f"Failed to connect to RabbitMQ at {self.host}:{self.port} - {last_err}")

    def close(self):
        if self.connection and not self.connection.is_closed:
            self.connection.close()

    def declare_queue(self, queue_name: str):
        if not self.channel:
            raise RuntimeError("Channel not established")
        self.channel.queue_declare(queue=queue_name, durable=True)

    def consume(self, queue_name: str, callback):
        if not self.channel:
            raise RuntimeError("Channel not established")
        self.declare_queue(queue_name)
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=False)
        self.channel.start_consuming()

    def publish(self, queue_name: str, message: str | bytes):
        if not self.channel:
            raise RuntimeError("Channel not established")
        self.declare_queue(queue_name)
        body = message if isinstance(message, (bytes, bytearray)) else str(message).encode("utf-8")
        self.channel.basic_publish(
            exchange='',
            routing_key=queue_name,
            body=body,
            properties=pika.BasicProperties(delivery_mode=2) 
        )
        print(f"Sent message to queue {queue_name}: {message}")
