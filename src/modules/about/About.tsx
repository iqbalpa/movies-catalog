import React from 'react';

interface AboutProps {
    title: string;
    content: string;
}

const About: React.FC<AboutProps> = ({ title, content }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default About;
