function circularBuffer(maxSize) {
    if (!maxSize || typeof maxSize !== 'number' || Math.floor(maxSize) !== maxSize || maxSize < 1 ) {
        throw new Error('maxSize must be a positive integer');
    }

    let maxSize = maxSize;
    let buffer = [];
    let startIndex = 0;
    let endIndex = 0;
    let isFull = false;

    return ({
        Push(item) {
            buffer[endIndex++] = item;

            if (isFull) {
                startIndex++
            }

            if (endIndex === startIndex) {
                isFull = true;
            }

            if (startIndex === maxSize) {
                startIndex = 0;
            }

            if (endIndex === maxSize) {
                endIndex = 0;
            }
        },
        Pop() {
            const item;

            if (startIndex === endIndex && !isFull) {
                throw new Error('Attempted to pop an empty buffer');
            }

            item = buffer[startIndex];
            buffer[startIndex++] = undefined;

            if (isFull) {
                isFull = false;
            }

            if (startIndex === maxSize) {
                startIndex = 0;
            }

            return item;
        },
        Count() {
            let normalisedEnd;

            if (isFull) {
                return maxSize;
            }

            if (startIndex <= endIndex) {
                normalisedEnd = endIndex;
            } else {
                normalisedEnd = endIndex + maxSize;
            }

            return normalisedEnd - startIndex;
        },
        Peek() {
            return buffer[startIndex];
        },
        Contains(item) {
            return buffer.includes(item);
        }
    });
};

