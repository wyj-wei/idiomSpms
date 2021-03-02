import axios from "../util/axios";

//登录
export function login(data: any) {
  return axios({
    url: "/api/users/login",
    method: "post",
    data
  });
}

//找回密码
export function forget(data: any) {
  return axios({
    url: "/api/users/findPwd",
    method: "post",
    data
  });
}

//修改密码
export function editPwd(data: any) {
  return axios({
    url: "/api/users/changePwd",
    method: "post",
    data
  });
}

//表格管理数据
export function getTable(params: any) {
  return axios({
    url: `/api/profiles/loadMore/${params.page}/${params.size}`
  });
}

//表格管理查询
export function searchTable(params: any) {
  return axios({
    url: `/api/profiles/search/${params.searchVal}/${params.page}/${params.size}`
  });
}

//表格数据编辑
export function EditTable(data: any) {
  return axios({
    url: `/api/profiles/edit/${data._id}`,
    method: "post",
    data
  });
}

//表格数据删除
export function EditDelete(id: string) {
  return axios({
    url: `/api/profiles/delete/${id}`,
    method: "delete"
  });
}

//表格数据删除
export function addTable(data: any) {
  return axios({
    url: '/api/profiles/add',
    method: "post",
    data
  });
}



//获取帐户列表
export function getUserTable() {
  return axios({
    url: '/api/users/allUsers',
  });
}

//新增用户
export function addUser(data:any) {
  return axios({
    url: '/api/users/addUser',
    method: "post",
    data
  });
}

//列表修改
export function editUser(data:any) {
  return axios({
    url: `/api/users/editUser/${data._id}`,
    method: "post",
    data
  });
}

//列表删除
export function deleteUser(data:any) {
  return axios({
    url: `/api/users/deleteUser/${data._id}`,
    method: "delete",
  });
}


