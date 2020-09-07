import { Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useDebounce } from "../../hooks/useDebounce";

interface Props {
  onUpdate(value: string): void;
}

export function TableSearchInput({ onUpdate }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const searchText = useDebounce(searchInput, 200);
  useEffect(() => {
    onUpdate(searchText);
  }, [onUpdate, searchText]);
  return (
    <div className="search-field-wrap">
      <div className="search-cont">
        <SearchIcon className="search-icon" />
        <Input
          margin="none"
          className="search-input"
          disableUnderline
          placeholder="Enter search keyword"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
}
