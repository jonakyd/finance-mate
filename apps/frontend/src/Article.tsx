import { useState } from "react";
import { api$ } from "./api-service";
import "./App.css";

export const Article = () => {
  const [count, setCount] = useState(0);
  const { data, isFetching } = api$.useQuery("get", "/users/{id}", {
    params: { path: { id: "123" } },
  });

  console.log({ data, isFetching });

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};
