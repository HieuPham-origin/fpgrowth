import React from 'react';

type RoundedButtonProps = {
    title: string;
    onClick: () => void;
    className?: string;
};

function RoundedButton({ title, onClick, className = '' }: RoundedButtonProps) {
    const buttonClasses = `px-6 py-2 rounded-full font-semibold transition-colors border border-transparent ${className}`;

    return (
        <button onClick={onClick} className={buttonClasses}>
            {title}
        </button>
    );
}

export default RoundedButton;