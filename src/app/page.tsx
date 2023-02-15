"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { ChangeEvent, MouseEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    console.log(fileInput.files);
    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    setFile(file);
  };
  const onUploadFile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file) {
      console.log("no file");
      return;
    }

    try {
      var formData = new FormData();
      formData.append("media", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
        } | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        alert(error || "Sorry! something went wrong.");
        return;
      }

      console.log("File was uploaded successfylly:", data);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };
  return (
    <div className="mt-4 flex flex-col gap-12 items-center justify-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Get back to growth with{" "}
        <span className="text-blue-600 dark:text-blue-500">the world's #1</span>{" "}
        CRM.
      </h1>
      <div className="w-1/4">
        <form className="w-full p-3" onSubmit={(e) => e.preventDefault()}>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="large_size"
          >
            Large file input
          </label>
          <input
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="large_size"
            type="file"
            onChange={(e) => onFileChange(e)}
          />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={(e) => onUploadFile(e)}
          >
            Default
          </button>
        </form>
      </div>
    </div>
  );
}
