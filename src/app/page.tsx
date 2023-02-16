"use client";
import { Inter } from "@next/font/google";
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

      sendFormData(e);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };
  const sendFormData = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
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
      toast.success("Succès!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Réessayez plus tard", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="mt-4 flex flex-col gap-6 items-center justify-center">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="md:mb-4 mb-1 p-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Déposer votre certificat après le test sur{" "}
        <span className="text-blue-600 dark:text-blue-500">
          Platforme Loghate.
        </span>{" "}
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
                Filière
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
            <option selected>Selectionner votre niveau</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
          <label
            className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={(e) => onUploadFile(e)}
          >
            Déposer
          </button>
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
    </div>
  );
}
