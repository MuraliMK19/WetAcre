import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CSVReader from "../CSVUpload/CSVUpload";

const ProductionVarContentAdmin = () => {
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [avgYield, setAvgYield] = useState<any>("");
  const [variety, setVariety] = useState("");
  const [type, setType] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [condition , setCondition] = useState("");
  const [features , setFeatures] = useState("");
  const [cycle ,setCycle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVarietySubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "crop/role-admin/variety/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            nameOfvariety: variety,
            localName: crop,
            scientificName:crop,
            areaOfAdaptation: area,
            productCondition:condition,
            salientFeatures:features,
            cropCycle:cycle,
          }),
        }
      );
      const data = await res.json();
      if (data.message=='Varities created!') {
        toast.success("Varities added!", {
          position: "top-right",
        });
      }
      else{
        toast.error("Error , please try again", {
          position: "top-right",
        });
      }

    } catch (err: any) {
      console.log(err);
      toast.error(err.message, {
        position: "top-right",
      });
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm mt-10 mb-5 ml-80">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="text-[#13490A] font-extrabold text-sm mx-5">
              Name of Variety
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              placeholder="Name of Variety"
              className="bg-[#F3FFF1] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setVariety(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="text-[#13490A] font-extrabold text-sm mx-5"
              // for="inline-password"
            >
              Crop
            </label>
          </div>
          <div className="md:w-2/3 ">
            <textarea
              className="bg-[#F3FFF1]  shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Crop"
              onChange={(e) => setCrop(e.target.value)}
            ></textarea>
          </div>
        </div>{" "}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="text-[#13490A] font-extrabold text-sm mx-5"
              // for="inline-password"
            >
              Area of Adpatation
            </label>
          </div>
          <div className="md:w-2/3 ">
            <textarea
              className="bg-[#F3FFF1]  shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Area of Adpatation"
              onChange={(e) => setArea(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="text-[#13490A] font-extrabold text-sm mx-5"
              // for="inline-password"
            >
              Product condition
            </label>
          </div>
          <div className="md:w-2/3 ">
            <textarea
              className="bg-[#F3FFF1]  shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Product condition"
              onChange={(e) => setCondition(e.target.value)}
            ></textarea>
          </div>
        </div>{" "}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="text-[#13490A] font-extrabold text-sm mx-5"
              // for="inline-password"
            >
              Salient features
            </label>
          </div>
          <div className="md:w-2/3 ">
            <textarea
              className="bg-[#F3FFF1]  shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Salient Features"
              onChange={(e) => setFeatures(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="text-[#13490A] font-extrabold text-sm mx-5"
              // for="inline-password"
            >
              cropCycle
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className=" bg-[#F3FFF1] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-400 h-24"
              //   onChange={onChangeArea}
              id="inline-password"
              maxLength={50}
              placeholder="Crop Cycle"
              onChange={(e) => setCycle(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#05AB2A] text-[#F3FFF1] flex shadow-[0px_4px_3px_rgba(0,0,0,0.25)] py-1 px-4 rounded mx-60 my-8 text-sm font-thin"
          onClick={handleVarietySubmit}
        >
          {
            loading?
            `loading...`:
            `Submit`
          }
        </button>
        OR
        <CSVReader />
        <a download="variety.csv" href="../../CSVFiles/variety.csv">
                  <button className="bg-[#05AB2A] text-[#F3FFF1] flex shadow-[0px_4px_3px_rgba(0,0,0,0.25)] py-1 px-4 rounded mx-60 my-8 text-sm font-thin">
                    Download CSV
                  </button>
                </a>
      </div>
    </>
  );
};

export default ProductionVarContentAdmin;
