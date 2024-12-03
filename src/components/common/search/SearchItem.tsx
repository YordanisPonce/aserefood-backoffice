import { InputAdornment, OutlinedInput, SxProps, Theme } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { MouseEventHandler } from "react";

interface Props {
  width?: string;
  placeholder: string;
  onSearch?: (value: string) => void;
  size?: "small" | "medium";
  value?: string;
  sx?: SxProps<Theme>;
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchItem = ({
  width,
  placeholder,
  onSearch,
  onClick,
  size = "small",
  value,
  sx,
}: Props) => (
  <OutlinedInput
    id="search-container"
    placeholder={placeholder}
    onClick={onClick}
    size={size}
    onChange={(e) => onSearch && onSearch(e.target.value)}
    value={value}
    startAdornment={
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    }
    sx={
      !sx
        ? {
            width: width,
            fontSize: "16px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }
        : sx
    }
  />
);
export default SearchItem;
