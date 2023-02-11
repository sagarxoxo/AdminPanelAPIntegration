import React, { useEffect, useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import "./AdminRoleTable.css";

export const AdminRoleTable = ({
  adminData,
  setAdminData,
  adminShowData,
  setAdminShowData,
  setSearchFilterData,
}) => {
  //to enable edit on table
  const [disabledId, setDisabledId] = useState();

  //for edit data
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
  });

  //array of id to delete multiple data
  const [arrIdData, setArrIdData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const numberOfData = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPagesNum = Math.ceil(adminData.length / numberOfData);

  //when page pages it update the table data and pages.
  const updateTableData = (page) => {
    setCurrentPage(page);
    const indexOfFirstPage = (page - 1) * numberOfData;
    const indexOfLastPage = indexOfFirstPage + numberOfData;
    setAdminShowData(adminData.slice(indexOfFirstPage, indexOfLastPage));
  };

  const editAdmin = ({ id, name, email, role }) => {
    setDisabledId(id);
    setFormData({ id, name, email, role });
  };

  const saveAdmin = (id) => {
    setDisabledId();
    const updateData = adminData.map((data) => {
      if (data.id === id) {
        return {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          id,
        };
      } else {
        return {
          ...data,
        };
      }
    });
    setAdminData(updateData);
  };

  const deleteAdmin = (id) => {
    setAdminData((prevData) => prevData.filter((data) => data.id !== id));
    setSearchFilterData((prevData) =>
      prevData.filter((data) => data.id !== id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleCheckbox = (id, e) => {
    setArrIdData((prevData) => {
      if (prevData.includes(id)) {
        const rmvId = prevData.filter((data) => data !== id);
        return rmvId;
      } else {
        return [...prevData, id];
      }
    });
  };

  const handleAllCheckbox = (e) => {
    const checkValue = e.target.checked;
    const idData = adminShowData.map((data) => data.id);
    setSelectAll(checkValue);
    checkValue ? setArrIdData(idData) : setArrIdData([]);
  };

  const multipleDelete = () => {
    setAdminData((prevData) =>
      prevData.filter((data) => !arrIdData.includes(data.id))
    );
    setSearchFilterData((prevData) =>
      prevData.filter((data) => !arrIdData.includes(data.id))
    );
    setSelectAll(false);
  };

  useEffect(() => {
    setAdminShowData(adminData.slice(0, numberOfData));
  }, [adminData, setAdminShowData]);

  return (
    <div className="admin-table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="check"
                checked={selectAll}
                onChange={(e) => handleAllCheckbox(e)}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminShowData.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    name="check"
                    checked={arrIdData.includes(data.id)}
                    onChange={(e) => handleCheckbox(data.id, e)}
                  />
                </td>
                <td>
                  <input
                    name="name"
                    type="text"
                    value={disabledId !== data.id ? data.name : formData.name}
                    disabled={disabledId !== data.id}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    type="email"
                    value={disabledId !== data.id ? data.email : formData.email}
                    disabled={disabledId !== data.id}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="role"
                    type="text"
                    value={disabledId !== data.id ? data.role : formData.role}
                    disabled={disabledId !== data.id}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <span>
                    {disabledId !== data.id ? (
                      <button onClick={() => editAdmin(data)}>Edit</button>
                    ) : (
                      <button onClick={() => saveAdmin(data.id)}>Save</button>
                    )}

                    <button onClick={() => deleteAdmin(data.id)}>Delete</button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        totalPagesNum={totalPagesNum}
        currentPage={currentPage}
        updateTableData={updateTableData}
      />
      {arrIdData.length > 0 && (
        <button className="delete-select-btn" onClick={multipleDelete}>
          Delete Selected
        </button>
      )}
    </div>
  );
};
