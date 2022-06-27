export interface Ticker {
  from: string;
  to: string;
  price: number;
}

type Callback = (t: Ticker) => void;
type ErrorCallback = (err: any) => void;

interface SubscribeRequest {
  from: string;
  to: string;
  success: Callback;
  error?: ErrorCallback;
}

interface UnsubscribeRequest {
  from: string;
  to: string;
}

export class CryptoCompareConnection {
  private readonly _market = "Coinbase";
  private _ws: WebSocket | null = null;
  private _subs: Record<string, boolean> = {};
  private _handlers: Record<string, [Callback, ErrorCallback | null]> = {};

  public constructor(private readonly _apiKey: string) {}

  private async _connect(): Promise<WebSocket> {
    if (this._ws) {
      return this._ws;
    }

    return await new Promise((res, rej) => {
      const ws = new WebSocket(
        `wss://streamer.cryptocompare.com/v2?api_key=${this._apiKey}`
      );

      ws.onopen = () => {
        res(ws);
      };

      ws.onerror = (err) => {
        rej(err);
      };

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (data.TYPE === "2") {
          const key = `2~${this._market}~${data.FROMSYMBOL}~${data.TOSYMBOL}`;

          if (!this._handlers[key] || !data.PRICE) {
            return;
          }

          this._handlers[key][0]({
            from: data.FROMSYMBOL,
            to: data.TOSYMBOL,
            price: data.PRICE,
          });

          return;
        }

        if (data.TYPE === "500" && data.MESSAGE === "INVALID_SUB") {
          const key = data.PARAMETER;

          if (!this._handlers[key]) {
            return;
          }

          const [, err] = this._handlers[key];

          if (!err) {
            return;
          }

          err(data);

          delete this._handlers[key];
          delete this._subs[key];
        }
      };

      this._ws = ws;
    });
  }

  public async subscribe(...subs: SubscribeRequest[]): Promise<void> {
    const unsubscribed: string[] = [];

    for (let i = 0; i < subs.length; i++) {
      const sub = subs[i];
      const key = `2~${this._market}~${sub.from}~${sub.to}`;

      this._handlers[key] = [sub.success, sub.error ?? null];

      if (!this._subs[key]) {
        unsubscribed.push(key);

        this._subs[key] = true;
      }
    }

    if (!unsubscribed.length) {
      return;
    }

    const ws = await this._connect();

    ws.send(JSON.stringify({ action: "SubAdd", subs: unsubscribed }));
  }

  public async unsubscribe(...subs: UnsubscribeRequest[]): Promise<void> {
    const subscribed: string[] = [];

    for (let i = 0; i < subs.length; i++) {
      const sub = subs[i];

      delete this._handlers[`${sub.from}-${sub.to}`];

      if (this._subs[`${sub.from}-${sub.to}`]) {
        subscribed.push(`2~${this._market}~${sub.from}~${sub.to}`);
      }
    }

    if (!subscribed.length) {
      return;
    }

    const ws = await this._connect();

    ws.send(JSON.stringify({ action: "SubRemove", subs: subscribed }));
  }
}
