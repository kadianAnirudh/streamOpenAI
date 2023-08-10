"use client";

import { useState } from "react";
import { tick } from "../assets";
import Image from "next/image";
import axios from "axios";

const Demo = () => {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");

  // API key needs to be filled to run the program
  const fetchData = async (input) => {
    const response = await axios.post(
      // request URL
      "https://api.openai.com/v1/completions",
      {
        prompt: `You are a customer support specialist at Stream, getstream.io, help the customer with their query: 
        "${input}"`,
        model: "text-davinci-002",
        max_tokens: 300,
        n: 10,
        stop: ".",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    // return response.data.choices[0].text;
    return response.data.choices;
  };

  // function with which API requests will be made
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* search */}

      <div className="flex flex-col w-full gap-2">
        <form
          // action="submit"
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <Image
            src={tick}
            alt="link-icon"
            className="absolute left-0 my-2 w-5 ml-3 "
          />

          <input
            type="text"
            placeholder="Enter your query"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="url_input peer w-4/5"
          />

          <button
            onClick={handleSubmit}
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↲
          </button>
        </form>

        {completedSentence && (
          <div className="result-container mt-10 w-full">
            <h3 className="">Solution:</h3>

            <p>{completedSentence[0].text}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;
