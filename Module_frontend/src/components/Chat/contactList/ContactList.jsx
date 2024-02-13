import React, { useEffect, useState } from "react";
import "./ContactList.scss";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../../services/userService";
import { searchUser } from "../../../redux/slices/UserSlice";
// import { fetchUserByEmail } from "../../../services/userService";

const ContactList = (props) => {
  const dispatch = useDispatch();
  const { data, loading, onSelect } = props
  const [value, setValue] = React.useState("1");

  const [searchData, setSearchData] = useState('');
  useEffect(() => {
    dispatch(searchUser(searchData));
    console.log(data);
  }, [searchData])
  const { user } = useSelector(state => state.users)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <>
      {!loading && (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{ width: "100%" }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab sx={{ width: "50%" }} label="Student" value="1" />
                <Tab sx={{ width: "50%" }} label="Teacher" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="nav-list">
                <div className="nav-search">
                  <input type="text" placeholder="Search..." value={searchData}
                    onChange={(e) => setSearchData(e.target.value)} />
                  <i className="bx bx-search-alt"></i>
                </div>
                <div className="content">
                  <div className="list-item">
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="nav-list">
                <div className="nav-search">
                  <input type="text" placeholder="Search..." value={searchData}
                    onChange={(e) => setSearchData(e.target.value)} />
                  <i className="bx bx-search-alt"></i>
                </div>
                <div className="content">
                  <div className="list-item">
                    {data.map((item, index) => {
                        return (
                        <div className="item" key={index} onClick={() => onSelect(item)}
                          style={user.id === item.id ? { backgroundColor: '#bebebe' } : {}}>
                          <div className="item-avatar">
                            <img src={`data:image/jpg;base64,${item.avt}`} alt="" />
                          </div>
                          <div className="item-content">
                            <p className="name">{item.name.split(",")[1]}</p>
                          </div>
                        </div>)
                    })}

                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>)}</>
  );
};

export default ContactList;
