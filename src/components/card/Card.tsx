import React from 'react';

interface CardProps {
    title: string;
    content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default Card;