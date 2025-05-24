import React from 'react';

// @ts-ignore
import CrudTable from 'antd-crud-table';
// @ts-ignore
import { usePersistentState } from 'persistent-state-react';
// @ts-ignore
import { useFetch } from 'network-react';
import logo from './landing.svg';
import styles from './Landing.module.scss';

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
  static async getList(params: Partial<User>): Promise<{ data: User[]; total: number }> {
    console.log('Fetching user list with params:', params);
    // please call this api: https://jsonplaceholder.typicode.com/posts/
    // and return the data in the format of { data: User[], total: number }

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
    const data = await response.json();
    const total = data.length;
    console.log('Fetched user list:', data);
    console.log('Total users:', total);
    return {data, total};

    // return {
    //   data: [
    //     { id: 1, name: 'John Doe', age: 30, createdAt: '2023-01-01', status: 'active', isAdmin: true },
    //     { id: 2, name: 'Jane Smith', age: 25, createdAt: '2023-02-01', status: 'inactive', isAdmin: false },
    //   ],
    //   total: 2,
    // };
  }

  static async create(data: Partial<User>) {
    console.log('Creating user:', data);
    return data as User;
  }

  static async update(id: number, data: Partial<User>) {
    console.log(`Updating user with id ${id}:`, data);
    return { id, ...data } as User;
  }

  static async delete(id: number) {
    console.log(`Deleting user with id ${id}`);
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
        service={UserService}
        columns={[
          {
            dataIndex: 'id',
            title: 'ID',
            fieldType: 'number',
            formConfig: { required: true },
          },
          {
            dataIndex: 'body',
            title: 'Body',
            fieldType: 'string',
          },
          {
            dataIndex: 'title',
            title: 'Title',
            fieldType: 'string',
          },
          {
            dataIndex: 'userId',
            title: 'User ID',
            fieldType: 'number',
          },
          // {
          //   dataIndex: 'status',
          //   title: 'Status',
          //   fieldType: 'enum',
          //   enumOptions: {
          //     active: { text: 'Active' },
          //     inactive: { text: 'Inactive' },
          //   },
          // },
          // {
          //   dataIndex: 'isAdmin',
          //   title: 'Administrator',
          //   fieldType: 'boolean',
          // },
        ]}
      />
    </div>

  );
};

const Landing = UserTable;

// eslint-disable-next-line import/no-default-export
export default Landing;
