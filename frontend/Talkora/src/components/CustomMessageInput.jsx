import React, { useState, useRef, useEffect } from "react";
import { MessageInput, useMessageInputContext } from "stream-chat-react";
import EmojiPicker from "emoji-picker-react";

function CustomMessageInput(props) {
  const { inputRef, inputText, setInputText } = useMessageInputContext();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputWrapperRef = useRef();

  const handleEmojiClick = (emojiData) => {
    if (!inputRef.current) return;

    const cursorPos = inputRef.current.selectionStart;
    const newText =
      inputText.slice(0, cursorPos) +
      emojiData.emoji +
      inputText.slice(cursorPos);

    setInputText(newText);
    inputRef.current.focus();
    inputRef.current.selectionEnd = cursorPos + emojiData.emoji.length;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={inputWrapperRef}
      className="fixed bottom-4 left-0 w-full flex items-center px-4 z-50 bg-white"
    >
      {/* Stream MessageInput */}
      <MessageInput {...props} className="flex-1 rounded-lg" />

      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default CustomMessageInput;
