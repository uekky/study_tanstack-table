import { useEffect, useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, []);

  const updateRow = (id: number) => {
    console.log('update', id);
  };
  
  const deleteRow = (id: number) => {
    console.log('delete', id);
  };
  
  const columnHelper = createColumnHelper<Post>();
  
  const columns = [
    columnHelper.accessor((row) => `${row.userId} ${row.id}`, {
      id: 'WID',
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (props) => props.getValue().toUpperCase(),
    }),
    columnHelper.accessor('body', {
      header: () => 'Body',
    }),
    columnHelper.display({
      id: 'update',
      header: '更新',
      cell: (props) => (
        <button onClick={() => updateRow(props.row.original.id)}>更新</button>
      ),
    }),
    columnHelper.display({
      id: 'delete',
      header: () => '削除',
      cell: (props) => (
        <button onClick={() => deleteRow(props.row.original.id)}>削除</button>
      ),
    }),
  ];

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ margin: '2em' }}>
      <h1>Posts List</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
        {table
          .getRowModel()
          .rows.slice(0, 5)
          .map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rows Number: {table.getRowModel().rows.length}</p>
    </div>
  );
}

export default App;