// 把麥克風的 128 樣本小塊攢成 512 再送到主執行緒（少一點訊息量）
class Capture extends AudioWorkletProcessor {
  constructor() { super(); this.buf = new Float32Array(512); this.n = 0; }
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch) {
      for (let i = 0; i < ch.length; i++) {
        this.buf[this.n++] = ch[i];
        if (this.n === 512) { this.port.postMessage(this.buf, [this.buf.buffer]); this.buf = new Float32Array(512); this.n = 0; }
      }
    }
    return true;
  }
}
registerProcessor('sv-capture', Capture);
