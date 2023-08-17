const SEND_MESSAGE_URI = 'http://185.46.8.130/api/v1/chat/send-message';

export const postMessage = async (
  message: string
): Promise<ReadableStream<Uint8Array> | null> => {
  const response = await fetch(SEND_MESSAGE_URI, {
    method: 'post',
    body: JSON.stringify({ message: message }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to send message. Status: ${response.status}`);
  }

  return response.body;
};
