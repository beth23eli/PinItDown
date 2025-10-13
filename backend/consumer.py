from services.rabbitmq_service import RabbitMQService
import json

QUEUE = "notes_event"

def callback(ch, method, properties, body):
    try:
        payload = json.loads(body.decode("utf-8"))
        print(f"[consumer] Received: {payload}")
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print(f"[consumer] Error processing message: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

if __name__ == "__main__":
    rabbitmq = RabbitMQService()
    rabbitmq.consume(QUEUE, callback)
