var test = require('tape');
var circularBuffer = require('../circularBuffer.js');

test('items are ejected correctly on push', t => {
    let buffer = circularBuffer(3);

    buffer.Push(0);
    t.strictEqual(0, buffer.Peek());

    buffer.Push(1);
    t.strictEqual(0, buffer.Peek());

    buffer.Push(2);
    t.strictEqual(0, buffer.Peek());

    buffer.Push(3);
    t.strictEqual(1, buffer.Peek());

    buffer.Push(4);
    t.strictEqual(2, buffer.Peek());

    buffer.Push(5);
    t.strictEqual(3, buffer.Peek());

    t.end();
});

test('items are popped correctly', t => {
    let buffer = circularBuffer(3);

    buffer.Push(0);
    buffer.Push(1);
    buffer.Push(2);
    buffer.Push(3);

    t.strictEqual(1, buffer.Pop());
    t.strictEqual(2, buffer.Pop());
    t.strictEqual(3, buffer.Pop());

    function caughtPop() {
        try {
            buffer.Pop()
        } catch {}
    }

    t.throws(caughtPop());

    t.end();
});

test('items are counted properly', t => {
    let buffer = circularBuffer(3);

    t.strictEquals(0, buffer.Count());

    buffer.Push(0);
    t.strictEquals(1, buffer.Count());

    buffer.Push(1);
    t.strictEquals(2, buffer.Count());

    buffer.Push(2);
    t.strictEquals(3, buffer.Count());

    buffer.Push(3);
    t.strictEquals(3, buffer.Count());

    buffer.Pop();
    t.strictEquals(2, buffer.Count());

    buffer.Pop();
    t.strictEquals(1, buffer.Count());

    buffer.Pop();
    t.strictEquals(0, buffer.Count());

    t.end();
});
