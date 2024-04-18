"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [text, setText] = useState<any>("");
  useEffect(() => {
    axios
      .get("http://raspberrypi.local:8000/shopping/shop")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Life Assistant</h1>
      <a href="http://raspberrypi.local:8000/admin">管理画面</a>
      <br />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="メモ"
        style={{ width: "300px", height: "300px" }}
      />
      <div className="flex flex-col items-center justify-center">
        <h3>店舗一覧</h3>
        {data.map((item: any) => (
          <div key={item.id}>
            <p>{`${item.name} - ${item.shop_branch}`}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
