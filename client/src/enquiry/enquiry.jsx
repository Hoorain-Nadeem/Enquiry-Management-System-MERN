
import axios from "axios";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";

export default function Enquiry() {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let [enquiryList, setEnquiryList] = useState([]);

  // ================= INSERT =================

  let submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/enquiry/insert", formData)
      .then((res) => {
        console.log(res)
        if(res.data.status==='04'){
          Swal.fire({
          title: "Error!",
          text: "Email already exist!",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
        }else{
            Swal.fire({
          title: "Inserted!",
          text: "Enquiry has been added successfully.",
          icon: "success",
          confirmButtonColor: "#6366f1",
        });
        }
       

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id: "",
        });

        getAllEnquiry();
      })
      .catch((err) => {
        console.log(err);
         
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while inserting data.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  // ================= INPUT =================

  let input = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let oldData = { ...formData };

    oldData[inputName] = inputValue;

    setFormData(oldData);
  };

  // ================= GET ALL ENQUIRIES =================

  let getAllEnquiry = () => {
    axios
      .get("http://localhost:5000/api/enquiry/list")
      .then((res) => {
        return res.data;
      })
      .then((Data) => {
        if (Data.status) {
          setEnquiryList(Data.enquiryList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ================= DELETE =================

  let deleteEnquiry = (delId) => {
    Swal.fire({
      title: "Delete enquiry?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:5000/api/enquiry/delete/${delId}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Enquiry has been deleted successfully.",
              icon: "success",
              confirmButtonColor: "#6366f1",
            });

            getAllEnquiry();
          })
          .catch((err) => {
            console.log(err);

            Swal.fire({
              title: "Error!",
              text: "Unable to delete enquiry.",
              icon: "error",
              confirmButtonColor: "#ef4444",
            });
          });
      }
    });
  };

  // ================= EDIT BUTTON =================

  let editEnquiry = (editId, name, email, phone, message) => {
    setFormData({
      name: name,
      email: email,
      phone: phone,
      message: message,
      _id: editId,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= UPDATE =================

  let editRow = (e) => {
    e.preventDefault();

    if (formData._id) {
      axios
        .put(`http://localhost:5000/api/enquiry/edit/${formData._id}`, formData)
        .then((res) => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });

          Swal.fire({
            title: "Updated!",
            text: "Enquiry has been updated successfully.",
            icon: "success",
            confirmButtonColor: "#6366f1",
          });

          getAllEnquiry();
        })
        .catch((err) => {
          console.log(err);

          Swal.fire({
            title: "Error!",
            text: "Unable to update enquiry.",
            icon: "error",
            confirmButtonColor: "#ef4444",
          });
        });
    }
  };

  // ================= USE EFFECT =================

  useEffect(() => {
    getAllEnquiry();
  }, []);

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-10">
      {/* ================= HEADER ================= */}

      <div className="mx-auto mb-8 max-w-7xl">
        <div className="text-center">
          <div className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Admin Dashboard
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-950 sm:text-4xl">
            Enquiry Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage and organize your customer enquiries
          </p>
        </div>
      </div>

      {/* ================= STAT CARD ================= */}

      <div className="mx-auto mb-8 max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 shadow-xl">
          {/* Decorative circles */}

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"></div>

          <div className="absolute -bottom-12 right-24 h-40 w-40 rounded-full bg-white/10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-100">
                Total Enquiries
              </p>

              <h2 className="mt-1 text-4xl font-extrabold text-white">
                {enquiryList.length}
              </h2>

              <p className="mt-1 text-xs text-indigo-100">
                Customer enquiries received
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
              📋
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 xl:grid-cols-[350px_1fr]">
        {/* ================= FORM CARD ================= */}

        <div className="h-fit rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-100/60">
          <div className="mb-6">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl text-white shadow-md">
              ✨
            </div>

            <h2 className="text-xl font-bold text-indigo-950">
              {formData._id === "" ? "Add New Enquiry" : "Edit Enquiry"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {formData._id === ""
                ? "Enter customer information below."
                : "Update the enquiry information."}
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={formData._id === "" ? submit : editRow}
            className="flex flex-col gap-4"
          >
            {/* NAME */}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" className="font-semibold text-slate-700">
                  Your Name
                </Label>
              </div>

              <TextInput
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={input}
                className="focus:ring-indigo-500"
              />
            </div>

            {/* EMAIL */}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" className="font-semibold text-slate-700">
                  Your Email
                </Label>
              </div>

              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
                value={formData.email}
                onChange={input}
              />
            </div>

            {/* PHONE */}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" className="font-semibold text-slate-700">
                  Your Phone
                </Label>
              </div>

              <TextInput
                id="phone"
                name="phone"
                type="tel"
                placeholder="+92 300 1234567"
                required
                value={formData.phone}
                onChange={input}
              />
            </div>

            {/* MESSAGE */}

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="message"
                  className="font-semibold text-slate-700"
                >
                  Message
                </Label>
              </div>

              <Textarea
                id="message"
                name="message"
                required
                placeholder="Write your message..."
                rows={5}
                value={formData.message}
                onChange={input}
              />
            </div>

            {/* SUBMIT */}

            <Button
              type="submit"
              className="mt-2 w-full border-0 bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold shadow-md transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg"
            >
              {formData._id === "" ? "Add Enquiry" : "Update Enquiry"}
            </Button>

            {/* CANCEL EDIT */}

            {formData._id !== "" && (
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    _id: "",
                  })
                }
                className="rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* ================= TABLE CARD ================= */}

        <div className="min-w-0 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-100/60">
          {/* TABLE HEADER */}

          <div className="flex flex-col gap-3 border-b border-indigo-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-indigo-950">
                Enquiry List
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                All customer enquiries are displayed here.
              </p>
            </div>

            <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
              {enquiryList.length} Records
            </div>
          </div>

          {/* RESPONSIVE TABLE */}

          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <TableHeadCell className="text-black">#</TableHeadCell>

                <TableHeadCell className="text-black">Name</TableHeadCell>

                <TableHeadCell className="text-black">Email</TableHeadCell>

                <TableHeadCell className="text-black">Phone</TableHeadCell>

                <TableHeadCell className="text-black">Message</TableHeadCell>

                <TableHeadCell className="text-black">Actions</TableHeadCell>
              </TableHead>

              <TableBody className="divide-y">
                {/* NO DATA */}

                {enquiryList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                          📭
                        </div>

                        <h3 className="font-semibold text-slate-700">
                          No enquiries found
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          Add your first enquiry using the form.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  enquiryList.map((item, index) => (
                    <TableRow
                      key={item._id || index}
                      className="bg-white transition hover:bg-indigo-50/50"
                    >
                      {/* NUMBER */}

                      <TableCell className="font-semibold text-indigo-600">
                        {String(index + 1).padStart(2, "0")}
                      </TableCell>

                      {/* NAME */}

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
                            {item.name?.charAt(0)?.toUpperCase()}
                          </div>

                          <span className="whitespace-nowrap font-semibold text-slate-700">
                            {item.name}
                          </span>
                        </div>
                      </TableCell>

                      {/* EMAIL */}

                      <TableCell className="whitespace-nowrap text-slate-600">
                        {item.email}
                      </TableCell>

                      {/* PHONE */}

                      <TableCell className="whitespace-nowrap text-slate-600">
                        {item.phone}
                      </TableCell>

                      {/* MESSAGE */}

                      <TableCell>
                        <div className="max-w-[220px] truncate text-slate-500">
                          {item.message}
                        </div>
                      </TableCell>

                      {/* ACTIONS */}

                      <TableCell>
                        <div className="flex gap-2">
                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              editEnquiry(
                                item._id,
                                item.name,
                                item.email,
                                item.phone,
                                item.message,
                              )
                            }
                            className="rounded-lg bg-violet-100 px-3 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-200 hover:text-violet-800"
                          >
                            Edit
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() => deleteEnquiry(item._id)}
                            className="rounded-lg bg-rose-100 px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-200 hover:text-rose-700"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="mx-auto mt-8 max-w-7xl text-center">
        <p className="text-xs text-slate-400">
          Enquiry Management System • Built with React, Tailwind CSS, Flowbite &
          Axios
        </p>
      </div>
    </div>
  );
}
