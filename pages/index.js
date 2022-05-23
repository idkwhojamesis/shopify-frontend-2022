import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const ResponseBlock = (props) => {
  return (
    <div className={styles.responseBlock}>
      <h3>Prompt:</h3>
      <p>{props.prompt}</p>
      <h3>Response:</h3>
      <p>{props.response}</p>
    </div>
  );
};

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [responses, setResponses] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: promptInput })
    });
    const data = await response.json();
    setResponses([
      { prompt: promptInput, response: data.result },
      ...responses
    ]);
    setPromptInput("");
  }

  return (
    <div>
      <Head>
        <title>Shopify: Fun with GPT-3</title>
      </Head>

      <main className={styles.main}>
        <h1>Fun with GPT-3 (ﾉ･ｪ･ )ﾉ</h1>
        <form onSubmit={onSubmit}>
          <textarea
            rows="10"
            cols="40"
            type="text"
            name="prompt"
            placeholder="what's up?"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Submit prompt" />
        </form>
        <div id="response-list">
          {responses.map((r) => (
            <ResponseBlock prompt={r.prompt} response={r.response} />
          ))}
        </div>
      </main>
    </div>
  );
}
