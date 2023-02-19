"use client";
import { trpc } from "@/utils/trpc";
import { Inter } from "@next/font/google";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    fullname: "",
    code: "",
    branch: "",
    email: "",
    level: "",
    vocabulary: "",
    grammar: "",
    reading: "",
    listening: "",
  });
  const student = trpc.saveStudent.useMutation()
    if(student.data?.status === 405){
       toast.error("Réessayez plus tard", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if(student.data?.status === 200){
      toast.success("Succès!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
    sendFormData(e);

    /*    try {
      var formData = new FormData();
      formData.append("media", file);
      formData.append("studentName", form.fullname);

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
        console.log(error);
        alert(error || "Sorry! something went wrong.");
        return;
      }

    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    } */
  };
  const sendFormData = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    student.mutate(form)

      toast.info("Chargement...", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
 

  };
  return (<>
    <div className="mt-4 flex flex-col gap-6 items-center justify-center">
      <Head>
      <title>Déposer votre certificat</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Application pour déposer votre certificat"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <ToastContainer />

       <h1 className="md:mb-4 mb-1 p-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Déposer votre certificat de test anglais sur {" "}
        <span className="text-blue-600 dark:text-blue-500">
          platforme Loghate.
        </span>{" "}
      </h1>
        <form className="p-3" onSubmit={(e) => e.preventDefault()}>
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
                Code Apogée
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
            <div>
              <label
                htmlFor="branch"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Filière
              </label>
              <select
                id="branches"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
              >
                <option>Choisiser une filiére</option>
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
          <div className="">
            <label
              htmlFor="level"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Niveau d{"'"}anglais
            </label>
            <select
              id="level"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              >
              <option >Selectionner votre niveau</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div className="my-4">
            <label
              htmlFor="level"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Niveau d{"'"}anglais en{" "}
              <span className="text-blue-600 dark:text-blue-500">Grammar</span>
            </label>
            <select
              id="level"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setForm({ ...form, grammar: e.target.value })}
              >
              <option>Selectionner votre niveau</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div className="my-4">
            <label
              htmlFor="level"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Niveau d{"'"}anglais en{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Vocabulary
              </span>
            </label>
            <select
              id="level"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setForm({ ...form, vocabulary: e.target.value })}
              >
              <option>Selectionner votre niveau</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div className="my-4">
            <label
              htmlFor="level"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Niveau d{"'"}anglais en{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Reading comprehension
              </span>
            </label>
            <select
              id="level"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setForm({ ...form, reading: e.target.value })}
              >
              <option>Selectionner votre niveau</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div className="my-4">
            <label
              htmlFor="level"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Niveau d{"'"}anglais en{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Listening comprehension
              </span>
            </label>
            <select
              id="level"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setForm({ ...form, listening: e.target.value })}
              >
              <option>Selectionner votre niveau</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div className="">
            <label
              className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="large_size"
            >
              Certificat
            </label>
            <input
              className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="large_size"
              type="file"
              onChange={(e) => onFileChange(e)}
              />
          </div>

          <div className="flex flex-row justify-between">
            <button
            type="button"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={(e) => onUploadFile(e)}
            >
            Déposer.
          </button>
          <Link href="/student" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
Vérifier votre inscription.
          </Link>
          </div>
        </form>
       </div>

      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center gap-8 md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 Powered by Vercel and PlanetScale™ . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="mailto:bermime@gmail.com" className="hover:underline">
              Contacter le developeur
            </a>
          </li>
        </ul>
      </footer>
            </>
  );
}
