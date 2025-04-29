import React from 'react';

import styles from './Landing.module.scss';

import logo from './landing.svg';
// @ts-ignore
import CrudTable from 'antd-crud-table';
// @ts-ignore
import { usePersistentState } from 'persistent-state-react';
// @ts-ignore
import { useFetch } from 'network-react';


// Example usage
interface User {
  id: number;
  name: string;
  age: number;
  createdAt: string;
  status: 'active' | 'inactive';
  isAdmin: boolean;
}

class UserService {
  async getList(params: any): Promise<{ data: User[]; total: number }> {
    // Implementation
    // return { data: [], total: 0 };
    return {
      data: [
        { id: 1, name: 'John Doe', age: 30, createdAt: '2023-01-01', status: 'active', isAdmin: true },
        { id: 2, name: 'Jane Smith', age: 25, createdAt: '2023-02-01', status: 'inactive', isAdmin: false },
      ],
      total: 2,
    }
  }

  async create(data: Partial<User>) {
    // Implementation
    return data as User;
  }

  async update(id: number, data: Partial<User>) {
    // Implementation
    return { id, ...data } as User;
  }

  async delete(id: number) {
    // Implementation
  }
}

const UserTable = () => {

  const [count1, setCount] = usePersistentState<number>('global/counter', 0);

  const [count2] = usePersistentState('global/counter', 0);

  const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/posts/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (

    <div style={{ textAlign: 'center' }}>
      <header>
        <img src={logo} className="animate-spin h-10 mx-auto" alt="logo" />
        <div className="text-red-600">
          React + TS + Vite + Tailwind
        </div>
        <div className={styles.sassExample}>
          sass is here for styling
        </div>
        <div style={{ border: '1px solid red', padding: '10px' }}>
          <p>
            global/counter state from variable 1
            <button
              type="button"
              onClick={() => setCount(count1 + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Count 1: {count1}
            </button>
          </p>
          <p>
            global/counter state from variable 2
            <button
              type="button"
              onClick={() => setCount(count2 + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Count 2: {count2}
            </button>
          </p>
        </div>
        <div>
          <p>
            {loading && 'Loading...'}
            {error && `Error: ${error}`}
            <table>
              {data && (data || []).map((item: any) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                </tr>
              ))}
            </table>
          </p>
        </div>
      </header>

      <CrudTable<User>
        title="User Management"
        rowKey="id"
        defaultPageSize={10}
        service={new UserService()}
        columns={[
          {
            dataIndex: 'name',
            title: 'Name',
            fieldType: 'string',
            formConfig: { required: true },
          },
          {
            dataIndex: 'age',
            title: 'Age',
            fieldType: 'number',
          },
          {
            dataIndex: 'age2',
            title: 'Age2',
            fieldType: 'number',
          },
          {
            dataIndex: 'createdAt',
            title: 'Created At',
            fieldType: 'date',
          },
          {
            dataIndex: 'status',
            title: 'Status',
            fieldType: 'enum',
            enumOptions: {
              active: { text: 'Active' },
              inactive: { text: 'Inactive' },
            },
          },
          {
            dataIndex: 'isAdmin',
            title: 'Administrator',
            fieldType: 'boolean',
          },
        ]}
      />
    </div>


  );
};

const Landing = UserTable;

// eslint-disable-next-line import/no-default-export
export default Landing;
