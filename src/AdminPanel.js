// src/AdminPanel.js
import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';

const dataProvider = fakeDataProvider({
  users: [
    { id: 1, name: 'Alice', email: 'alice@gmail.com' },
    { id: 2, name: 'Bob', email: 'bob@gmail.com' },
  ],
});

export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
}
