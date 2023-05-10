import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { getError } from '../utils';
import { toast } from 'react-toastify'


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

const AdminUsersScreen = () => {

  const navigate = useNavigate();
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
// console.log(users)
  const { state } = useContext(Store);
  const { userInfo } = state

  // const [users, setUsers] = useState([])
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const users = await axios.get('/api/admin', {
  //       headers: { Authorization: `Bearer ${userInfo.token}` }
  //     })
  //     console.log(users.data)
  //     setUsers(users.data)
  //   }
  //   fetchUsers();
  // }, [])

  // const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (user) => {
    console.log(user._id)
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: "DELETE_REQUEST" })
        await axios.delete(`/api/admin/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        // console.log(data)
        toast.success('user deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'DELETE_FAIL' });
      }
    }
  }


  const [userInfoState, setUserInfoState] = useState({...users})
console.log(userInfoState)
  const setUserAdmin = async (user, isAdminValue) => {
    console.log(user)

    try {
      await axios.put(`/api/admin/setUser/${user._id}`, { isAdmin: isAdminValue }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
      setUserInfoState({ ...userInfo, isAdmin: isAdminValue })
      console.log(setUserInfoState({ ...userInfo, isAdmin: isAdminValue }))
      // console.log(data)
      toast.success('user is admin now, successfully');
    } catch (error) {
      toast.error(getError(error));
    }
  }



  //   const [open, setOpen] = useState(false)
  //   const openUpload = () => {
  //     setOpen(!open)
  //   }
  //  {open && <Upload setOpen={setOpen} />}


  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1>Users</h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table className="table" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Is Admin</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}

                  <Form.Check
                    type="switch"
                    value={user.isAdmin}
                    checked={user.isAdmin}
                    onChange={(e) => setUserAdmin(user, e.target.checked)}
                    id="disabled-custom-switch"
                  />
                </td>
                <td>
                  <Button type="button" variant="light"
                  // onClick={() => navigate(`/admin/user/${user._id}`)}
                  // onClick={openUpload}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  {/* <Button onClick={change}>change</Button> */}
                  <Button type="button" variant="danger" onClick={() => deleteHandler(user)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {/* {open && <Upload setOpen={setOpen} />} */}
    </div>
  )
}

export default AdminUsersScreen