import { InputAdornment, OutlinedInput } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface Props {
  width?: string;
  placeholder: string;
  onSearch?: (value: string) => void;
  size?: "small" | "medium";
  value?: string;
}

const SearchItem = ({
  width,
  placeholder,
  onSearch,
  size = "small",
  value,
}: Props) => (
  <OutlinedInput
    id="search-container"
    placeholder={placeholder}
    size={size}
    onChange={(e) => onSearch && onSearch(e.target.value)}
    value={value}
    startAdornment={
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    }
    sx={{
      width: width,
      fontSize: "16px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "none",
        },
      },
    }}
  />
);
export default SearchItem;
