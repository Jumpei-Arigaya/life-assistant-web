"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [text, setText] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const postText = () => {
    axios
      .post("http://raspberrypi.local:8000/todo/memo/", {
        content: text,
      })
      .then((res) => {
        setText(res.data[0].content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getText = () => {
    setIsLoading(true);
    axios
      .get("http://raspberrypi.local:8000/todo/memo")
      .then((res) => {
        console.log(res.data[0].content);
        setText(res.data[0].content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getText();
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
        disabled={isLoading}
        onChange={(e) => setText(e.target.value)}
        placeholder="メモ"
        style={{ width: "300px", height: "300px" }}
      />
      <button
        onClick={postText}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded"
      >
        メモ更新
      </button>
      <div className="flex flex-col items-center justify-center mt-10">
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
