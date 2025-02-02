'use client';

import { ElementRef, useEffect, useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';

type InputEmojiProps<T> = {
    onSelect: (props: T) => void;
};
const InputEmoji = ({ onSelect }: InputEmojiProps<string>) => {
    const { theme } = useTheme();
    const [showInputEmoji, setShowInputEmoji] = useState<boolean>(false);

    const handelInputEmoji = (e: any) => {
        onSelect(e.native);
    };

    const inputEmojiRef = useRef<ElementRef<'span'>>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputEmojiRef.current &&
                !inputEmojiRef.current.contains(e.target as Node)
            ) {
                setShowInputEmoji(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowInputEmoji]);
    return (
        <span ref={inputEmojiRef}>
            <button
                type="button"
                onClick={() => setShowInputEmoji(!showInputEmoji)}
                className="rounded-full p-2 hover:bg-primary/10"
                title="Emoji"
            >
                <Smile size={20} className="text-primary" />
            </button>
            {showInputEmoji ? (
                <div className="absolute left-1/2 top-full z-50">
                    <Picker
                        autoFocus
                        data={data}
                        theme={theme}
                        showPreview={false}
                        showSkinTones={false}
                        emojiSize={20}
                        emojiButtonSize={28}
                        onEmojiSelect={handelInputEmoji}
                    />
                </div>
            ) : null}
        </span>
    );
};

export default InputEmoji;
