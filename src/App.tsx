import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  FilterFn,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, []);

  const columns = [
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "body",
      header: "Body",
    },
  ];

  // カスタムフィルター関数を定義
  const fuzzyFilter: FilterFn<any> = (row, columnId, filterValue: string) => {
    // フィルター値が空の場合はすべての行を表示
    if (!filterValue) return true;

    const searchValue = filterValue.toLowerCase();
    // titleとbodyの両方の値を取得
    const title = row.getValue("title")?.toString().toLowerCase() || "";
    const body = row.getValue("body")?.toString().toLowerCase() || "";

    // どちらかに検索文字列が含まれていればtrue
    return title.includes(searchValue) || body.includes(searchValue);
  };

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    // カスタムフィルター関数を設定
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    // globalFilterの変更ハンドラを設定
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div style={{ margin: "2em" }}>
      <h1>Posts List</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={globalFilter}
        onChange={(e) => {
          // グローバルフィルターを更新
          setGlobalFilter(e.target.value);
        }}
      />
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
          {table.getRowModel().rows.map((row) => (
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
    </div>
  );
}

export default App;