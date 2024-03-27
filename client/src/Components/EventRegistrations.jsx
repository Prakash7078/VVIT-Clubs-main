import { useState, useEffect } from "react";
import { makeRunner, makeWinner } from "../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { getRegisters } from "../redux/registerSlice";
import { Input, Button, Switch } from "@material-tailwind/react";
import ReactPaginate from "react-paginate";
import gold from "../Images/gold-medal.png";
import silver from "../Images/silver-medal.png";
import { Dialog } from "@material-tailwind/react";
import ProfileDialog from "../Components/ProfileDialog";

function EventRegistrations({ club, handleOpen, event_id }) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10; // Number of products per page
  const [yearFilter, setYearFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [studentFilter, setStudentFilter] = useState(false);
  const [coordinatorFilter, setCoordinatorFilter] = useState(false);
  const [searchroll, setSearchroll] = useState("");
  const [profileroll, setProfileroll] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const registers = useSelector((state) => state.register.registers);
  const [dialog, setDialog] = useState(false);
  const handleDialog = () => {
    setDialog(!dialog);
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("user", userInfo);
      await dispatch(getRegisters());
    };
    fetchData();
  }, [dispatch]);
  const handleCategoryChange = (e) => {
    setYearFilter(e.target.value);
  };
  const handleDialogData = (rollno) => {
    setProfileroll(rollno);
    handleDialog();
    console.log(profileroll, rollno);
  };
  const handleBranchChange = (e) => {
    setBranchFilter(e.target.value);
  };

  const handleStudentChange = (e) => {
    setStudentFilter(e.target.checked);
  };

  const handleCoordinatorChange = (e) => {
    setCoordinatorFilter(e.target.checked);
  };
  const filteredProducts = registers?.filter((product) => {
    if (product.clubname !== club) return false;
    if (event_id && product.event._id !== event_id) return false;
    if (
      yearFilter !== "All" &&
      String(product?.eventregisteruser?.year) !== yearFilter
    )
      return false;
    if (
      branchFilter !== "All" &&
      product?.eventregisteruser?.branch !== branchFilter
    )
      return false;
    if (studentFilter && product?.eventregisteruser?.category !== "Student")
      return false;
    if (
      coordinatorFilter &&
      product?.eventregisteruser?.category !== "Coordinator"
    )
      return false;
    return true;
  });
  // Calculate the number of pages
  const totalPages = Math.ceil(filteredProducts?.length / perPage);

  // Function to handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  // Get the products for the current page
  const currentProducts = filteredProducts?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const handleSearch = (roll) => {
    setSearchroll(roll);
  };

  const handleWinner = async (rollno, winner) => {
    handleOpen("winner");
    await dispatch(makeWinner({ rollno, winner }));
    await dispatch(getRegisters());
  };
  const handleRunner = async (rollno, runner) => {
    await dispatch(makeRunner({ rollno, runner }));
    await dispatch(getRegisters());
  };
  return (
    <div className="mx-4">
      <div
        className={`${
          userInfo.isAdmin || userInfo.category === "Coordinator"
            ? "blur-none"
            : " blur-sm  pb-5 backdrop-brightness-90  pointer-events-none"
        }`}
      >
        <div className="flex lg:mx-10 mx-2 flex-col md:flex-row justify-between sm:mt-16 mt-10 mb-5 items-center gap-2">
          <div className=" flex items-center gap-3 md:mb-0 flex-wrap  flex-col sm:flex-row ">
            <div>
              <label htmlFor="yearFilter" className="sm:mr-2">
                Year:
              </label>
              <select
                id="yearFilter"
                className="px-2 py-2 border rounded-md"
                value={yearFilter}
                onChange={handleCategoryChange}
              >
                <option value="All">All</option>
                <option value="1">FirstYear</option>
                <option value="2">SecondYear</option>
                <option value="3">ThirdYear</option>
                <option value="4">FourthYear</option>
                {/* Add more categories here */}
              </select>
            </div>
            <div>
              <label htmlFor="branchFilter" className="ml-4 mr-2">
                Branch
              </label>
              <select
                id="branchFilter"
                className="px-2 py-2 border rounded-md"
                value={branchFilter}
                onChange={handleBranchChange}
              >
                <option value="All">All</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                {/* Add more price options here */}
              </select>
            </div>
            <div>
              <label htmlFor="studentFilter" className="ml-4 mr-2">
                Students
              </label>
              <input
                type="checkbox"
                id="studentFilter"
                checked={studentFilter}
                onChange={handleStudentChange}
              />

              <label htmlFor="coordinatorFilter" className="ml-4 mr-2">
                Coordinators
              </label>
              <input
                type="checkbox"
                id="coordinatorFilter"
                checked={coordinatorFilter}
                onChange={handleCoordinatorChange}
              />
            </div>
          </div>
          <div className="relative flex  md:w-max  justify-between ">
            <Input
              color="brown"
              type="search"
              label="Type Rollno..."
              className="pr-24 "
              onChange={(e) => handleSearch(e.target.value)}
              containerProps={{
                className: "md:min-w-[288px] ",
              }}
            />
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-brown-600"
            >
              Search
            </Button>
          </div>
        </div>
        <div
          className={`overflow-x-auto rounded-lg lg:mx-10 ${
            userInfo.isAdmin || userInfo.category === "Coordinator"
              ? "bg-white"
              : "blur-sm"
          } mx-1`}
        >
          <table className="w-full border-collapse">
            <thead className="top-0 sticky">
              <tr className="bg-orange-500 text-secondary  ">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">EventName</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Branch</th>
                <th className="px-4 py-2">RollNo</th>
                <th className="px-4 py-2">Section</th>
                <th className="px-4 py-2">Winner</th>
                <th className="px-4 py-2">Runner</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts
                ?.filter(
                  (item) => item?.eventregisteruser?.rollno === searchroll
                )
                .map((product) => (
                  <tr key={product?._id} className="bg-slate-300">
                    <td className="border text-center px-4 py-2">
                      <img
                        onClick={() =>
                          handleDialogData(product?.eventregisteruser?.rollno)
                        }
                        className="rounded-full w-10 cursor-pointer h-10 mx-auto"
                        src={product?.eventregisteruser?.image}
                      />
                    </td>
                    <td className="border text-center px-4 py-2">
                      {product?.eventregisteruser?.username}
                    </td>
                    <td className="border text-center px-4 py-2">
                      {product?.event?.eventname}
                    </td>
                    <td className="border text-center px-4 py-2">
                      {product?.eventregisteruser?.category}
                    </td>
                    <td className="border text-center px-4 py-2">
                      {product?.eventregisteruser?.year}
                    </td>
                    <td className="border text-center px-4 py-2">
                      {product?.eventregisteruser?.branch}
                    </td>
                    <td className="border text-center px-4 py-2">
                      {product?.eventregisteruser?.rollno}
                    </td>
                    <td className="border text-center px-4 py-2">
                      {product?.eventregisteruser?.section}
                    </td>
                    <td>
                      {userInfo &&
                        (userInfo.isAdmin ||
                          userInfo.category === "Coordinator") && (
                          <div className="w-fit mx-auto cursor-pointer">
                            {product.isWinner ? (
                              <img
                                src={gold}
                                className="w-10 h-10 object-cover"
                                onClick={() =>
                                  handleWinner(
                                    product?.eventregisteruser?.rollno,
                                    product.isWinner
                                  )
                                }
                              />
                            ) : (
                              <Switch
                                color="red"
                                onClick={() =>
                                  handleWinner(
                                    product?.eventregisteruser?.rollno,
                                    product.isWinner
                                  )
                                }
                              />
                            )}
                          </div>
                        )}
                    </td>
                    <td>
                      {userInfo &&
                        (userInfo.isAdmin ||
                          userInfo.category === "Coordinator") && (
                          <div className="w-fit mx-auto cursor-pointer">
                            {product.isRunner ? (
                              <img
                                src={silver}
                                className="w-10 h-10 object-cover"
                                onClick={() =>
                                  handleRunner(
                                    product?.eventregisteruser?.rollno,
                                    product.isRunner
                                  )
                                }
                              />
                            ) : (
                              <Switch
                                color="red"
                                onClick={() =>
                                  handleRunner(
                                    product?.eventregisteruser?.rollno,
                                    product.isRunner
                                  )
                                }
                              />
                            )}
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              {currentProducts?.map((product) => (
                <tr key={product?.eventregisteruser?._id}>
                  <td className="border text-center px-4 py-2">
                    <img
                      onClick={() =>
                        handleDialogData(product?.eventregisteruser?.rollno)
                      }
                      className="rounded-full cursor-pointer w-10 h-10 mx-auto"
                      src={product?.eventregisteruser?.image}
                    />
                  </td>
                  <td className="border text-center px-4 py-2">
                    {product?.eventregisteruser?.username}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {product?.event?.eventname}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {product?.eventregisteruser?.category}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {product?.eventregisteruser?.year}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {product?.eventregisteruser?.branch}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {product?.eventregisteruser?.rollno}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {product?.eventregisteruser?.section}
                  </td>
                  <td>
                    {userInfo &&
                      (userInfo.isAdmin ||
                        userInfo.category === "Coordinator") && (
                        <div className="w-fit mx-auto cursor-pointer">
                          {product.isWinner ? (
                            <img
                              src={gold}
                              className="w-10 h-10 object-cover"
                              onClick={() =>
                                handleWinner(
                                  product?.eventregisteruser?.rollno,
                                  product.isWinner
                                )
                              }
                            />
                          ) : (
                            <Switch
                              color="red"
                              onClick={() =>
                                handleWinner(
                                  product?.eventregisteruser?.rollno,
                                  product.isWinner
                                )
                              }
                            />
                          )}
                        </div>
                      )}
                  </td>
                  <td>
                    {userInfo &&
                      (userInfo.isAdmin ||
                        userInfo.category === "Coordinator") && (
                        <div className="w-fit mx-auto cursor-pointer">
                          {product.isRunner ? (
                            <img
                              src={silver}
                              className="w-10 h-10 object-cover"
                              onClick={() =>
                                handleRunner(
                                  product?.eventregisteruser?.rollno,
                                  product.isRunner
                                )
                              }
                            />
                          ) : (
                            <Switch
                              color="red"
                              onClick={() =>
                                handleRunner(
                                  product?.eventregisteruser?.rollno,
                                  product.isRunner
                                )
                              }
                            />
                          )}
                        </div>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`${
          userInfo.isAdmin || userInfo.category === "Coordinator"
            ? "hidden"
            : "absolute font-bold lg:text-xl text-brown-400 flex items-center justify-center inset-x-0 inset-y-0"
        }`}
      >
        <h1 className="mx-6  text-center">
          Only admins and coordinators can see these registartions.
        </h1>
      </div>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="flex mt-4 justify-center"
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        activeClassName="text-primary"
        disabledClassName="text-gray-500 cursor-not-allowed"
        pageClassName="px-2 cursor-pointer"
        previousClassName="px-2 cursor-pointer"
        nextClassName="px-2 cursor-pointer"
        breakClassName="px-2"
      />
      <Dialog
        size="xs"
        open={dialog}
        handler={handleDialog}
        className="bg-transparent shadow-none"
      >
        <ProfileDialog rollno={profileroll} handle={handleDialog} />
      </Dialog>
    </div>
  );
}

export default EventRegistrations;
