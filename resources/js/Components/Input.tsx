import React, { useEffect, useRef } from "react";

interface InputProps {
    type: string;
    name: string;
    value: string | number;
    max?: number;
    className?: string;
    autoComplete?: string;
    required?: boolean;
    isFocused?: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
    type = "text",
    name,
    value,
    max,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
}: InputProps) {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, []);

    return (
        <>
            <input
                type={type}
                name={name}
                value={value}
                max={max}
                className={
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required
                onChange={(e) => handleChange(e)}
            />
        </>
    );
}
