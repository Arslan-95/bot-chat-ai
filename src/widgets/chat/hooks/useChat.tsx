import { useRef, useState } from 'react';
import { postMessage } from '../api';
import { ChunkParser, Iterator, TextParser } from '../lib';
import { Message } from '../model';

export const useChat = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const sendMessageFormRef = useRef<HTMLDivElement>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const scrollToLastMessage = () => {
    const messagesContainer = messagesContainerRef.current;

    if (!messagesContainer) return;

    setTimeout(() => {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const scrollWindowToForm = () => {
    const sendMessageForm = sendMessageFormRef.current;

    if (!sendMessageForm) return;

    setTimeout(() => {
      sendMessageForm.scrollIntoView({
        behavior: 'smooth',
      });
    });
  };

  const updateMessages = (cb: (prev: Message[]) => Message[]) => {
    setMessages((prev) => cb(prev));
    scrollToLastMessage();
  };

  const submit = async () => {
    setMessageText('');
    setIsLoading(true);

    try {
      const messageId = messages[messages.length - 1]
        ? messages[messages.length - 1].id + 1
        : 0;
      updateMessages((prev) => [
        ...prev,
        { id: messageId, text: messageText, isSended: true },
      ]);

      const res = await postMessage(messageText);

      if (!res) return;

      const responseMessageId = messageId + 1;
      const values: Message['text'][] = [];
      const decoder = new TextDecoder();

      for await (const result of Iterator.fromStream<BufferSource | undefined>(
        res
      )) {
        const decodedChunks = decoder.decode(result, { stream: true });
        const parsedChunks = TextParser.parse(decodedChunks);

        if (!parsedChunks) continue;

        for (const chunk of parsedChunks) {
          const data = ChunkParser.parse(chunk);

          switch (data.status) {
            case 'content': {
              values.push(data.value);

              continue;
            }

            case 'done': {
              break;
            }
          }
        }

        updateMessages((prev) => {
          const newArr = [...prev];
          const responseMessageIndex = prev.findIndex(
            ({ id }) => id === responseMessageId
          );

          const responseMessage: Message = {
            id: responseMessageId,
            text: values.join(''),
            isSended: false,
          };

          if (responseMessageIndex) {
            newArr[responseMessageId] = responseMessage;

            return newArr;
          }

          return [...newArr, responseMessage];
        });
      }
    } catch (error) {
      console.log('[submit]', error);
    }

    scrollWindowToForm();
    setIsLoading(false);
  };

  return {
    messageText,
    handleMessageChange,
    messages,
    submit,
    isLoading,
    messagesContainerRef,
    sendMessageFormRef,
  };
};
