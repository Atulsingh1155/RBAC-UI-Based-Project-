import React, { useState } from 'react';
import UserManagement from '../components/UserManagement';
import styled from 'styled-components';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (index) => {
    const newUsers = users.filter((_, idx) => idx !== index);
    setUsers(newUsers);
  };

  return (
    <PageWrapper>
      <Title>User Management</Title>
      <UserManagement users={users} addUser={addUser} deleteUser={deleteUser} />
    </PageWrapper>
  );
};

// Styled Components

const PageWrapper = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(to right, #74ebd5, #9face6);
  min-height: 100vh;
  animation: fadeIn 1.5s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, color 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    color: #ffdd59;
  }
`;

const UserManagementWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: auto;
  width: 60%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
  background-color: #6a11cb;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2575fc;
    transform: scale(1.05);
  }
`;

export default UsersPage;
