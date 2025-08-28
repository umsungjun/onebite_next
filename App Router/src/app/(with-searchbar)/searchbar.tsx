"use client";

import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" value={search} onInput={onChangeSearch} />
      <button>검색</button>
    </div>
  );
}
