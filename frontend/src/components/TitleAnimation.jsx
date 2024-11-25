import { useEffect } from 'react';
import '../assets/styles/titleAnimation.css';
import _ from 'lodash';

const TitleAnimation = () => {
    useEffect(() => {
        const handleScroll = _.throttle(() => {
            const scrollPhrase = document.documentElement.scrollTop;
            const phrases = Array.from({ length: 5 }, (_, i) =>
                document.getElementById(`phrase${i + 1}`)
            );

            phrases.forEach((phrase, index) => {
                if (phrase) {
                    phrase.style.transform =
                        index % 2 === 0
                            ? `translateX(${scrollPhrase}px)`
                            : `translateX(-${scrollPhrase}px)`;
                }
            });
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const phrases = ["F", "R", "A", "M", "E"];
    return (
        <div className="text-animation-wrapper">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="phrase-container" id={`phrase${i + 1}`}>
                    {phrases.map((char, j) => (
                        <div
                            key={j}
                            className={`phrase ${i === j ? "highlight" : ""}`}
                        >
                            {char}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TitleAnimation;
