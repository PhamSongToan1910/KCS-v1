import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./UserDetail.scss";
import { fetchUserById } from "../../../redux/slices/UserSlice";
import { Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);



  const bodyData = [
    {
      title: "Mã tài khoản: ",
      value: user ? user.maTK : "",
    },
    {
      title: "Họ và tên:",
      value: user ? user.name : "",
    },
    {
      title: "Email:",
      value: user ? user.email : "",
    },
    {
      title: "Giới tính:",
      value: user ? (user.gender === true ? 'Nam' : "Nữ") : "",
    },
    {
      title: "Số điện thoại:",
      value: user ? user.phone : "",
    },
    {
      title: "Ngày sinh:",
      value: user ? user.birthDay : "",
    },
    {
      title: "Ngưởi tạo:  ",
      value: user ? user.createBy : "",
    },
    {
      title: "Người sửa",
      value: user ? user.updateBy : "",
    },

    {
      title: "Ngày tạo:",
      value: user ? user.createDate : "",
    },
    {
      title: "Ngày sửa:",
      value: user ? user.updateDate : "",
    },
    {
      title: "Vai trò:",
      value: user
        ? user.role === "ROLE_ADMINISTRATOR"
          ? "ADMIN"
          : "USER"
        : "",
    },
  ];

  return (
    <>

      {!loading && user &&
        (<div className="user-detail">
          <h2>Thông tin chi tiết tài khoản</h2>
          <div className="user-detail-container">
            <div className="avatar">
              <img src={`data:image; base64, ${user.avt}`} alt="ảnh đại diện" />
            </div>
            <div className="list-field">
              {bodyData.map((item, index) => (
                <div key={index} className="field">
                  <label>
                    {" "}
                    <i className="bx bxs-star"></i>
                    {item.title}
                  </label>
                  <input type="text" value={item.value || ''} readOnly />
                </div>
              ))}
              <div className="field" style={{ margin: "20px 0" }}>
                <i className="bx bxs-star"></i>
                <label>Trạng thái:<b>{user.isDelete === true ? "   Đã xóa" : " Hoạt động"}</b></label>
              </div>
            </div>
          </div>
          <div className="cancel">
            <Link to="/admin/user">
              <button>Thoát</button>
            </Link>
          </div>
        </div>)}
    </>);
};

export default UserDetail;
