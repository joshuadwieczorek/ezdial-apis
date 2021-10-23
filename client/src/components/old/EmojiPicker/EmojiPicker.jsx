import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import InputEmoji from "react-input-emoji";
import { relative } from 'path';
const EmojiPicker = ({ setSymbolValue }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(value + emojiObject.emoji)
    setValue(value + emojiObject.emoji);
  };

  function handleOnEnter(text) {
    console.log("enter", text);
  }
  // console.log(value, typeof (value), chosenEmoji);

  return (
    <div style={{ position: relative }}>
      <InputEmoji
        value={text}
        // onChange={setText}
        onChange={(value) => setSymbolValue(value)}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
      />
    </div>
  );
};

export default EmojiPicker;