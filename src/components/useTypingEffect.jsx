import { useState, useEffect } from "react";

const useTypingEffect = (firstText, secondText, speed = 150, delay = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [currentText, setCurrentText] = useState(firstText);
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const typingInterval = setInterval(() => {
      setDisplayText((prevText) => prevText + currentText[index]);
      setIndex((prevIndex) => prevIndex + 1);

      if (index === currentText.length - 1) {
        clearInterval(typingInterval);
        setIsTyping(false);

        setTimeout(() => {
          setDisplayText("");
          setCurrentText(currentText === firstText ? secondText : firstText);
          setIndex(0);
          setIsTyping(true);
        }, delay);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [index, currentText, isTyping, firstText, secondText, speed, delay]);

  return displayText;
};

export default useTypingEffect;
