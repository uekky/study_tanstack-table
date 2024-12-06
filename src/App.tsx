import { useEffect, useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel,
  flexRender,
  CoreCell
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

  const columns = [
    {
      accessorKey: 'userId',
      header: () => 'User ID',
    },
    {
      accessorKey: 'id',
      header: () => <h1>ID</h1>,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (props: CoreCell<Post, string>) => props.getValue().toUpperCase(),
    },
    {
      accessorKey: 'body',
      header: 'Body',
    },
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