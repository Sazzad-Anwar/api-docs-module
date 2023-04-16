export default function CapitalLetterWord(word: string): string {
    if (word) {
        if (word?.split(' ').length > 1) {
            return word
                .split(' ')
                .map((word) => CapitalLetterWord(word))
                .join(' ');
        } else {
            return (
                word?.split('')[0]?.toUpperCase() +
                word
                    ?.split('')
                    .filter((letter, i) => i !== 0)
                    .join('')
            );
        }
    } else {
        return word;
    }
}
