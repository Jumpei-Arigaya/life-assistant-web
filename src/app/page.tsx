"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    axios
      .get("http://0.0.0.0:8000/shopping/shop")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Shopping List</h1>
      <div className="flex flex-col items-center justify-center">
        {data.map((item: any) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
