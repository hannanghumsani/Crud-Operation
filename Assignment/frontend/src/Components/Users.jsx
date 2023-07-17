import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';

function Users() {
  // const refresh = false;
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [Update, setUpdata] = useState({});
  const [refresh, setRefresh] = useState(false);

  const handleUpdate = email => {
    const userUpdate = Update.user.find(obj => obj.email === email);
    console.log(userUpdate);

    navigate('/edit', {state: userUpdate});
  };
  const DeleteUser = async (email) => {
    try {
      const userUpdate = Update.user.find(obj => obj.email === email);
      console.log(userUpdate);
      const userId = userUpdate._id;
      const response = await axios.delete(`http://localhost:8080/api/users/${userId}`);
      console.log(response.data); 
      setRefresh(prevRefresh => !prevRefresh);
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        const responseData = response.data;
        setUpdata(responseData);
        const modifiedUsers = responseData.user.map(
          ({_id, __v, confirmPassword, ...rest}) => rest,
        );
        setData(modifiedUsers);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [[refresh]]);

  const columns = [
    {name: 'First Name', selector: 'firstName', sortable: true},
    {name: 'Last Name', selector: 'lastName', sortable: true},
    {name: 'Email', selector: 'email', sortable: true},
    {name: 'Password', selector: 'password', sortable: true},
    {
      name: 'Update',
      cell: row => (
        //     <Link to={{ pathname: '/edit', state: { useremail: 'example@example.com' } }}>

        //     <button className="btn btn-primary">Update</button>
        //   </Link>
        <button
          className="btn btn-warning"
          onClick={() =>  handleUpdate(row.email)}>
          Edit
        </button>
      ),
      button: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <button
          className="btn btn-danger"
          onClick={() => DeleteUser(row.email)}>
          Delete
        </button>
      ),
      button: true,
    },
  ];

  const handleSearch = event => {
    const keyword = event.target.value.toLowerCase();
    const filteredData = data.filter(
      item =>
        item.firstName.toLowerCase().includes(keyword) ||
        item.lastName.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.password.toLowerCase().includes(keyword),
    );
    setData(filteredData);
  };

  return (
    <>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <DataTable
        title="Users"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
      />
      <div>
        <Link className="btn btn-primary" to="/register">
          Create User
        </Link>
      </div>
    </>
  );
}

export default Users;
