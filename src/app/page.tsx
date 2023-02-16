"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    fullname: "",
    code: "",
    branch: "",
    email: "",
    level: "",
  });
  useEffect(() => {
    console.log(form);

    return () => {};
  }, [form]);

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

      sendFormData();
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };
  const sendFormData = async () => {
    const res = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(form),
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
  };
  return (
    <div className="mt-4 flex flex-col gap-12 items-center justify-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Get back to growth with{" "}
        <span className="text-blue-600 dark:text-blue-500">the world's #1</span>{" "}
        CRM.
      </h1>
      <div className="w-full md:w-1/4">
        <form className="w-full p-3" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-6 mb-6 ">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nom Complet
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Crow"
                required
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              />
            </div>
            <div>
              <label
                htmlFor="code apogée"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Code Appogée
              </label>
              <input
                type="number"
                id="code-appogée"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="15806341"
                required
                onChange={(e) => setForm({ ...form, code: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Filiére
              </label>
              <select
                id="branches"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
              >
                <option selected>Choisiser une filiére</option>
                <option value="SMP">SMP</option>
                <option value="SMC">SMC</option>
                <option value="SVI">SVI</option>
                <option value="STU">STU</option>
                <option value="SMA">SMA</option>
                <option value="SMI">SMI</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <select
            id="level"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            <option selected>Selectionner votre niveau</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
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
