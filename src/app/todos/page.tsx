"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<any>([]);

  const getTodos = () => {
    setIsLoading(true);
    axios
      .get("http://raspberrypi.local:8000/todo/todo")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todos</h1>
      <ul className="my-5">
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
