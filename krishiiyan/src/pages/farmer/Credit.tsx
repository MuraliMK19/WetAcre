import React, { useEffect, useState } from "react";
import Header from "../../Components/layouts/Header";
import * as Api from "../../Services/Api";
import { toast } from "react-toastify";
import moment from "moment";
import Weather from "./Weather";
import { MenuItem, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import { number } from "yargs";

const Credit = () => {
  let row: any = "5";
  let col: any = "20";
  const [openTab, setOpenTab] = useState("New");
  const [fetchData, setFetchData] = useState(false);
  const [farmerMobile, setFarmerMobile] = useState("");
  const [farmerDetails, setFarmerDetails] = useState<any>();
  const [farmerCredits, setFarmerCredits] = useState<any>();
  const [page, setPage] = useState<any>(1);
  const [rows, setRows] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getFarmerCredits = async () => {
    const [err, res] = await Api.getFarmerCreditData(farmerDetails?._id);
    if (res) {
      setFarmerCredits(res?.data?.farmerCreditData);
      setRows(Math.ceil(res?.data?.total / 10));
    }
  };

  useEffect(() => {
    const init = async () => {
      await getFarmerCredits();
    };
    init();
  }, [farmerMobile, farmerDetails]);

  //Credit
  const [eligibleAmount, setEligibleAmount] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);
  const [creditPeriod, setCreditPeriod] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const [reason, setReason] = useState<any>(" ");
  const [reasond, setReasond] = useState(" ");
  const [total_payable_amount, set_total_payable_amount] = useState("0");
  const [interest_amount, set_interest_amount] = useState("");
  const [due_date, set_due_date] = useState("");
  const [oldCultivation, setOldCultivation] = useState<any>();

  console.log({ total_payable_amount, interest_amount, due_date });

  // useEffect(() => {
  //   const getEligibleAmount = () => {
  //     setEligibleAmount(farmerDetails?.creditLimit);
  //   };
  //   getEligibleAmount();
  // }, [farmerDetails, farmerMobile]);
  const onChangeMobile = (e: any) => {
    setFarmerMobile(e.target.value);
  };

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };
  const onChangeAmount = (e: any) => {
    // setEligibleAmount(e.target.value);
    setCreditAmount(e.target.value);
  };

  const onChangePeriod = (e: any) => {
    setCreditPeriod(e.target.value);
  };

  const onChangeRate = (e: any) => {
    setInterestRate(e.target.value);
  };

  const onChangeReason = async (e: any) => {
    setReason(JSON.parse(e.target.value));
  };

  useEffect(() => {
    (async () => {
      try {
        if (!reason) return;
        const [err, res] = await Api.farmerCreditLimit(
          farmerDetails?._id,
          reason?._id
        );
        setEligibleAmount(res?.data.eligibleAmount);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [reason]);

  //Status
  const [credit_id, set_credit_id] = useState("");
  const [credit_details, set_credit_details] = useState<any>();

  const onChangeCreditNum = (e: any) => {
    set_credit_id(e.target.value);
  };

  const onChangeCreditReason = (e: any) => {
    setReasond(e.target.value);
  };
  //Pay Credit
  const [amn_payable, set_amn_payable] = useState("");
  const [payment_method, set_payment_method] = useState("cash");

  const onChangeAmountPayable = (e: any) => {
    set_amn_payable(e.target.value);
  };

  const onChangePaymentMethod = (e: any) => {
    set_amn_payable(e.target.value);
  };

  //Get Farmer Details {Search farmer by mobile number}
  const getFarmerByMobile = async () => {
    const [err, res] = await Api.getFarmer(farmerMobile);
    if (res) {
      setFarmerDetails(res?.data);
      // setEligibleAmount(res?.data?.creditLimit);
    }
  };

  //Get credit amount Info
  const getcreditamountInfo = async () => {
    const [err, res] = await Api.FarmerCreditAmountInfo(
      creditAmount.toString(),
      creditPeriod,
      interestRate
    );
    if (res) {
      // set_total_payable_amount(res?.data?.TotalPayableAmount);
      set_total_payable_amount(
        parseFloat(res?.data?.TotalPayableAmount).toFixed(2)
      );
      set_interest_amount(res?.data?.InterestAmount);
      set_due_date(res?.data?.DueDate);
    }
  };

  const onClickEnter = async () => {
    localStorage.setItem("Number", farmerMobile);
    await getFarmerByMobile();
  };

  useEffect(() => {
    const init = async () => {
      // await getFarmerByMobile();
      await getcreditamountInfo();
    };
    init();
  }, [farmerMobile, eligibleAmount, creditPeriod, interestRate]);

  //Get Farmer Cultivations
  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getFarmerCultivationData(farmerDetails?._id);
      if (res) {
        setOldCultivation(res?.data?.farmerCultivationData);
      }
    };
    init();
  }, [farmerMobile, farmerDetails]);
  // console.log(oldCultivation, "This is a oldcultivation data");

  const sanctionCredit = async () => {
    if (farmerDetails && eligibleAmount) {
      const [err, res] = await Api.createFarmerCredit(
        creditAmount.toString(),
        eligibleAmount,
        reason?.crop,
        creditPeriod,
        interestRate,
        total_payable_amount,
        due_date,
        interest_amount,
        farmerDetails._id
      );

      if (err) {
        toast.error(err?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (res) {
        getFarmerCredits();
        toast.success(
          `${eligibleAmount} Credit sanctioned to ${farmerDetails?.name}`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        console.log(res, "Credit sanctioned response__________");
      }
    }
  };

  useEffect(() => {
    const getCreditDetails = async () => {
      if (credit_id) {
        const [err, res] = await Api.getCreditTxInfo(credit_id);
        if (res) {
          console.log("Credit details________", res.data.credit);
          set_credit_details(res.data.credit);
        }
      }
    };
    getCreditDetails();
  }, [credit_id]);

  const payCredit = async () => {
    const [err, res] = await Api.payCredit(
      credit_id,
      amn_payable,
      payment_method
    );
    if (err) {
      toast.error(err.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      getFarmerCredits();
      toast.success(`Paid Success!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res, "Credit pay response__________");
    }
  };
  // useEffect(() => {
  //   const init = async () => {
  //     await getFarmerByMobile();
  //   };
  //   init();
  // }, [farmerMobile]);

  useEffect(() => {
    if (fetchData) {
      onClickEnter();
    }
  }, [fetchData]);

  useEffect(() => {
    if (localStorage.Number)
      setFarmerMobile((prev: any) => localStorage.Number);
    setFetchData(true);
  }, []);

  //get eligible amount
  // useEffect(() => {
  //   const getFarmerEligibleAmount = async () => {
  //     const [err, res] = await Api.farmerCreditLimit(
  //       farmerDetails?._id,
  //       reason?._id
  //     );
  //   };
  //   if (farmerDetails) getFarmerEligibleAmount();
  // }, [farmerDetails, farmerMobile, reason]);

  // crop k select k onchange pr crop ki id (on change event) aur farmer id (farmerDetails?._id)
  // await Api.farmerCreditLimit(farmerDetails?._id, cropId)

  return (
    <div>
      <Header title="Farmer Relationship Management" subtitle="Credit" />
      <section className="font-roboto">
        {/* Input Search box */}
        <div className="grid grid-cols-[70%_30%] items-center box-border w-full">
          <div className="grid grid-cols-[35%_45%_15%_5%] mt-7 flex-row items-center w-full">
            <label className="text-[#13490A] font-roboto font-extrabold text-sm flex justify-center">
              Farmer Mobile Number
            </label>
            <input
              type="text"
              className="bg-[#F3FFF1] h-8 lg:w-[86%] xl:w-[90%] lg:ml-2 xl:ml-[1%] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
              onChange={onChangeMobile}
            />
            <button
              type="submit"
              onClick={onClickEnter}
              className="bg-[#05AB2A] text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] py-1 w-[6vw] rounded text-sm font-thin"
            >
              ENTER
            </button>
          </div>
          {farmerDetails ? (
            <div className="mt-10 leading-4 ml-24">
              <p className="text-[#000000] font-bold text-start">
                Name:{" "}
                <span className="text-[#FB0404]">{farmerDetails?.name}</span>
              </p>
              <p className="text-[#000000] font-bold text-start">
                Area :{" "}
                <span className="text-[#FB0404]">
                  {farmerDetails?.address?.state}
                </span>
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
      {farmerDetails ? (
        <section className="font-roboto">
          {/* Tab Button */}

          <div className=" w-[78%] flex justify-center">
            <div className="flex gap-x-[10%] mt-2 w-[30%]">
              <button
                className={`text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] flex justify-center w-[6vw] py-1 px-3 rounded text-sm font-thin ${
                  openTab === "Status" ? "bg-[#05AB2A]" : "bg-[#526D4E]"
                }`}
                onClick={() => {
                  setOpenTab("Status");
                }}
              >
                Status
              </button>
              <button
                className={`text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] flex justify-center w-[6vw] py-1 px-4 rounded text-sm font-thin ${
                  openTab === "New" ? "bg-[#05AB2A]" : "bg-[#526D4E]"
                }`}
                onClick={() => {
                  setOpenTab("New");
                }}
              >
                New
              </button>
              <button
                className={`text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] flex justify-center w-[6vw] py-1 px-4 rounded text-sm font-thin ${
                  openTab === "Pay" ? "bg-[#05AB2A]" : "bg-[#526D4E]"
                }`}
                onClick={() => {
                  setOpenTab("Pay");
                }}
              >
                Pay
              </button>
            </div>
          </div>

          {/* Status */}
          <div className={openTab === "Status" ? "block" : "hidden"}>
            {/* <form className="grid grid-cols-[35%_45%_15%_5%] mt-7 flex-row items-center w-full">
              <label className="text-[#13490A] font-roboto font-extrabold text-sm flex justify-center">
                Credit Number
              </label>
              <input
                type="text"
                className="bg-[#F3FFF1] h-8 lg:w-[86%] xl:w-[90%] lg:ml-2 xl:ml-[1%] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                onChange={onChangeCreditNum}
              />
            </form> */}
            <section className="mt-10">
              {farmerCredits ? (
                <table className="table-auto border-collapse border border-black font-bold text-base w-[96%] mx-auto">
                  <thead className="border-b border-black">
                    <tr className="text-center">
                      <th className="border-r border-black py-[1.2%] pl-0.5 pr-0.5">
                        S.No
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Credit number
                      </th>
                      <th className="border-r border-black py-[1.2%] pl-1 pr-1">
                        Reason
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Credit Amount
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Credit Period
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Interest Rate
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Interest Amount
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Total Payable Amount
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Due Date
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Payment Status
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Remaining Payable Amount
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Paid Amount
                      </th>
                      <th className="border-r border-black py-[1.2%]">
                        Payment Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmerCredits
                      ?.slice((page - 1) * 10, page * 10)
                      .map((credit: any, index: any) => (
                        <tr className="h-10 border-b border-black">
                          <td className="border-r border-black font-thin">
                            {(page - 1) * 10 + index + 1}
                          </td>
                          <td className="border-r border-black font-thin">
                            {credit?.billNumber}
                          </td>
                          <td className="border-r border-black pl-0.5 pr-0.5 font-thin">
                            {credit?.reason}
                          </td>
                          <td className="border-r border-black font-thin">
                            {credit?.creditAmount}
                          </td>

                          {/* <td className="border-r border-black">
                          {moment(credit?.createdAt).format("DD/MM/YYYY")}
                        </td> */}
                          <td className="border-r border-black font-thin">
                            {credit?.creditPeriod} months
                          </td>
                          <td className="border-r border-black font-thin">
                            {credit?.interestRate} %
                          </td>
                          <td className="border-r border-black font-thin">
                            {parseFloat(credit?.interestAmount).toFixed(2)}
                          </td>
                          <td className="border-r border-black font-thin">
                            {parseFloat(credit?.totalPayableAmount).toFixed(2)}
                          </td>
                          <td className="border-r border-black pl-1 pr-1 font-thin">
                            {credit?.dueDate}
                          </td>
                          <td className="border-r border-black font-thin">
                            {credit?.paymentStatus}
                          </td>
                          {credit?.remainingPayableAmount !== "" &&
                          credit?.remainingPayableAmount !== undefined ? (
                            <td className="border-r border-black font-thin">
                              {parseFloat(
                                credit?.remainingPayableAmount
                              ).toFixed(2)}
                            </td>
                          ) : (
                            <>
                              <td className="border-r border-black font-thin"></td>
                            </>
                          )}

                          <td className="border-r border-black font-thin">
                            {credit?.remainingPayableAmount
                              ? (
                                  credit?.totalPayableAmount -
                                  credit?.remainingPayableAmount
                                ).toFixed(2)
                              : "-"}
                          </td>
                          <td className="border-r border-black font-thin">
                            {moment(credit?.updatedAt).format("DD-MM-YYYY")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <></>
              )}
              <Pagination
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                  mr: 2,
                }}
                count={rows}
                page={page}
                onChange={handlePageChange}
              />
            </section>
          </div>

          {/* Credit */}
          <div className={openTab === "New" ? "block" : "hidden"}>
            <div className="grid grid-cols-[25%_28%_15%] text-center items-center my-4">
              <label className="text-[#13490A] font-extrabold text-sm mx-5">
                Reason
              </label>
              <select
                id="countries"
                className="bg-[#F3FFF1] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={onChangeReason}
              >
                <option selected>Choose Reason</option>
                {oldCultivation?.map((crop: any) => (
                  <option value={JSON.stringify(crop)}>
                    {crop?.crop} (
                    {moment(crop?.dateOfSowing).format("DD-MM-YYYY")})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-[25%_28%] text-center items-center my-4">
              <label className="text-[#13490A] font-extrabold text-sm mx-5">
                Credit Eligible Amount
              </label>
              <input
                type="text"
                className="bg-[#F3FFF1]  h-8 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                defaultValue={eligibleAmount}
                value={eligibleAmount}
                onChange={onChangeAmount}
                disabled
              />
              {/*  */}
            </div>
            <div className="grid grid-cols-[25%_28%_15%] text-center items-center my-4">
              <label className="text-[#13490A] font-extrabold text-sm mx-5">
                Credit Amount
              </label>
              <input
                min="1"
                max="20000"
                type="text"
                className="bg-[#F3FFF1]  h-8 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                value={creditAmount}
                onChange={onChangeAmount}
              />
            </div>

            <div className="grid grid-cols-[70%_28%_15%] text-center items-center my-2">
              {/* {Number(eligibleAmount) > Number(farmerDetails?.creditLimit) ? ( */}
              {Number(eligibleAmount) < creditAmount ? (
                <p className="text-center font-extrabold text-md text-[#ff0000]">
                  Maximum credit limit is {eligibleAmount}.
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-[53%_47%] my-4">
              <div className="grid grid-cols-[47%_53%] text-center items-center">
                <label className="text-[#13490A] font-extrabold text-sm mx-5">
                  Credit Period
                </label>
                <input
                  placeholder="In Months"
                  type="text"
                  className="bg-[#F3FFF1]  h-8 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                  onChange={onChangePeriod}
                />
              </div>
              <div className="grid grid-cols-[45%_50%] items-center">
                <label className="text-[#13490A] flex-[1] text-cente font-extrabold text-sm mx-5">
                  Due Date
                </label>
                <input
                  type="text"
                  className="bg-[#F3FFF1]  h-8 w-35 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                  value={due_date}
                />
              </div>
            </div>
            <div className="grid grid-cols-[53%_47%] my-4">
              <div className="grid grid-cols-[47%_53%] text-center items-center">
                <label className="text-[#13490A] font-extrabold text-sm mx-5">
                  Interest Rate
                </label>
                <input
                  type="text"
                  className="bg-[#F3FFF1]  h-8 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                  onChange={onChangeRate}
                />
              </div>
            </div>
            <div className="grid grid-cols-[53%_47%] my-4">
              <div className="grid grid-cols-[47%_53%] text-center items-center">
                <label className="text-[#13490A] font-extrabold text-sm mx-5">
                  Total Payable Amount
                </label>
                <input
                  type="text"
                  className="bg-[#F3FFF1]  h-8 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                  value={total_payable_amount}
                />
              </div>
              <div className="grid grid-cols-[45%_50%] items-center">
                <label className="text-[#13490A] flex-[1] text-cente font-extrabold text-sm mx-5">
                  Interest Amount
                </label>
                <input
                  type="text"
                  className="bg-[#F3FFF1]  h-8 w-35 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md p-2"
                  value={interest_amount}
                />
              </div>
            </div>
            <div className="w-[78%] flex justify-center">
              <button
                type="submit"
                className="bg-[#05AB2A] text-[#F3FFF1] flex justify-center shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-16 py-1 px-4 rounded text-sm font-thin"
                onClick={sanctionCredit}
              >
                Sanction
              </button>
            </div>
          </div>

          {/* Credit Pay */}
          <div className={openTab === "Pay" ? "block" : "hidden"}>
            <div className="">
              <div className="grid grid-cols-[25%_28%] text-center items-center my-4">
                <label className="text-[#13490A]  font-roboto font-extrabold text-sm mx-5">
                  Credit Number
                </label>
                <select
                  id="countries"
                  className="bg-[#F3FFF1] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] overflow-y-scroll ... rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={onChangeCreditNum}
                >
                  <option selected>Choose Credit Number</option>
                  {farmerCredits?.map((credit: any) => (
                    <option value={credit_details}>{credit?.billNumber}</option>
                  ))}
                </select>
              </div>

              {credit_details && credit_id ? (
                <>
                  <div className="grid grid-cols-[25%_28%] text-center items-center my-4">
                    <label className="text-[#13490A]  font-roboto font-extrabold text-sm mx-5">
                      Detail
                    </label>
                    <div className="p-1 bg-[#F3FFF1]">
                      <h1 className="text-start font-bold">
                        Credit Date :{" "}
                        {moment(credit_details?.createdAt).format("MM/DD/YYYY")}
                      </h1>
                      <h1 className="text-start font-bold">
                        Due Date : {credit_details?.dueDate}
                      </h1>
                      <h1 className="text-start font-bold">
                        Amount :{" "}
                        {parseFloat(credit_details?.totalPayableAmount).toFixed(
                          2
                        )}
                      </h1>
                      {credit_details?.remainingPayableAmount !== "" &&
                      credit_details?.remainingPayableAmount !== undefined ? (
                        <h1 className="text-start font-bold">
                          Remaining Payable Amount:{" "}
                          {parseFloat(
                            credit_details?.remainingPayableAmount
                          ).toFixed(2)}
                        </h1>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-[25%_28%] text-center items-center my-4">
                    <label className="text-[#13490A]  font-roboto font-extrabold text-sm mx-5">
                      Amount Payable
                    </label>
                    <input
                      type="text"
                      className="bg-[#F3FFF1]  h-8  shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md pl-2"
                      onChange={onChangeAmountPayable}
                    />
                  </div>
                  <div className="grid grid-cols-[25%_28%_15%] text-center items-center my-4">
                    <label className="text-[#13490A]  font-roboto font-extrabold text-sm mx-5">
                      Payment Method
                    </label>
                    <select
                      id="countries"
                      className="bg-[#F3FFF1]  shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={onChangePaymentMethod}
                    >
                      <option selected>Choose Payment Method</option>
                      <option value={amn_payable}>CASH</option>
                      <option value={amn_payable}>UPI</option>
                      <option value={amn_payable}>CARD</option>
                    </select>
                    {/* <img
                      src="Images/Dropdown.png"
                      className="ml-4 text-center rounded-full"
                    /> */}
                  </div>
                  <div className="w-[78%] flex justify-center">
                    <button
                      onClick={payCredit}
                      className="bg-[#05AB2A] text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-16 py-1  text-sm font-thin"
                    >
                      Pay
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {/*  */}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Credit;
