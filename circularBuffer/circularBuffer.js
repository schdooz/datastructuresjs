function circularBuffer(maxSize) {
    if (!maxSize || typeof maxSize !== 'number' || Math.floor(maxSize) !== maxSize || maxSize < 1 ) {
        throw new Error('maxSize must be a positive integer');
    }

    let buffer = [];
    let readIndex = 0;
    let writeIndex = 0;
    let isFull = false;

    return ({
        Push(item) {
            buffer[writeIndex++] = item;

            if (isFull) {
                readIndex++
            }

            if (readIndex === maxSize) {
                readIndex = 0;
            }

            if (writeIndex === maxSize) {
                writeIndex = 0;
            }

            if (writeIndex === readIndex) {
                isFull = true;
            }
        },
        Pop() {
            let item;

            if (readIndex === writeIndex && !isFull) {
                throw new Error('Attempted to pop an empty buffer');
            }

            item = buffer[readIndex];
            buffer[readIndex++] = undefined;

            if (isFull) {
                isFull = false;
            }

            if (readIndex === maxSize) {
                readIndex = 0;
            }

            return item;
        },
        Count() {
            let normalisedEnd;

            if (isFull) {
                return maxSize;
            }

            if (readIndex <= writeIndex) {
                normalisedEnd = writeIndex;
            } else {
                normalisedEnd = writeIndex + maxSize;
            }

            return normalisedEnd - readIndex;
        },
        Peek() {
            return buffer[readIndex];
        },
        Contains(item) {
            return buffer.includes(item);
        }
    });
};

