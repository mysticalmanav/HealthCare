import { useState, useEffect } from 'react';

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array, the `addMessage` function, the `updateMessage` function, the `deleteMessage` function, the `clearChat` function, and the `sliceMessages` function.
 */
const useMessageCollection = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  /**
   * A function for adding a new message to the collection.
   *
   * @param {Object} message - The message to add to the collection.
   */
  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  /**
   * A function to simulate typing effect for a message.
   *
   * @param {number} id - The ID of the message to update.
   * @param {string} fullText - The full text of the message to display.
   */
  const simulateTypingEffect = (id, fullText) => {
    let currentText = '';
    let index = 0;

    const type = () => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setMessages((prev) =>
          prev.map((message) =>
            message.id === id ? { ...message, text: currentText } : message
          )
        );
        index++;
        setTimeout(type, 50); // Adjust typing speed here
      }
    };

    type();
  };

  /**
   * A function for updating an existing message in the collection.
   *
   * @param {number} id - The ID of the message to update.
   * @param {Object} updatedMessage - The updated message object.
   */
  const updateMessage = (id, updatedMessage) => {
    if (updatedMessage.text) {
      simulateTypingEffect(id, updatedMessage.text);
    } else {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id ? { ...message, ...updatedMessage } : message
        )
      );
    }
  };

  /**
   * A function for deleting a message from the collection.
   *
   * @param {number} id - The ID of the message to delete.
   */
  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  /**
   * A function for clearing all messages in the collection and resetting to an empty array.
   */
  const clearChat = () => {
    localStorage.setItem('messages', JSON.stringify([]));
    setMessages([]);
  };

  /**
   * A function for slicing the messages array.
   *
   * @param {number} end - The ending index of the slice.
   * @returns {Array} A new array containing the sliced portion of the messages array.
   */
  const sliceMessages = (index) => {
    setMessages((prev) => prev.slice(0, index));
  };

  return { messages, addMessage, updateMessage, deleteMessage, clearChat, sliceMessages };
};

export default useMessageCollection;