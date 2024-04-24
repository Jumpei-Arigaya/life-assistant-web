"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const postMemo = () => {
    setIsLoading(true);
    axios
      .post("http://raspberrypi.local:8000/todo/memo/", {
        content: memo,
      })
      .then((res) => {
        setMemo(res.data[0].content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchMemo = () => {
    setIsLoading(true);
    axios
      .get("http://raspberrypi.local:8000/todo/memo")
      .then((res) => {
        setMemo(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchShopData = () => {
    axios
      .get("http://raspberrypi.local:8000/shopping/shop")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMemo();
    fetchShopData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Life Assistant</h1>
      <h2 className="text-3xl">Menu</h2>
      <ul>
        <li>
          <a href="/todos">Todos</a>
        </li>
        <li>
          <a href="http://raspberrypi.local:8000/admin">管理画面</a>
        </li>
      </ul>
      <br />

      <h2 className="text-3xl">Memo</h2>
      <input
        type="text"
        value={memo}
        disabled={isLoading}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="メモ"
        style={{ width: "300px", height: "300px" }}
      />
      <button
        onClick={postMemo}
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
