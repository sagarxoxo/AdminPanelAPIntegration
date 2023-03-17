import "./App.css";
import { AdminRoleTable } from "./components/AdminRoleTable/AdminRoleTable";
import { useEffect, useState } from "react";

function App() {
  //fetch data stored in this
  const [adminData, setAdminData] = useState([]);

  //to show admin data in table
  const [adminShowData, setAdminShowData] = useState([]);

  //search filtered Table Data
  const [searchFilterData, setSearchFilterData] = useState([]);

  const [showNoRecord, setShowNoRecord] = useState(false);

  const handleSearch = (value) => {
    if (value !== "") {
      const filteredData = adminData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      setSearchFilterData(filteredData);
    } else {
      setSearchFilterData(adminData);
    }
  };

  console.log(showNoRecord);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
        .then((res) => res.json())
        .then((data) => setAdminData(data));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by name, email, or role"
        name="searchData"
        className="input-searchbar"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <AdminRoleTable
        adminData={searchFilterData < 1 ? adminData : searchFilterData}
        setAdminData={setAdminData}
        adminShowData={adminShowData}
        setAdminShowData={setAdminShowData}
        searchFilterData={searchFilterData}
        setSearchFilterData={setSearchFilterData}
        showNoRecord={showNoRecord}
      />
    </div>
  );
}

export default App;
