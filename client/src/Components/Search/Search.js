import { InputGroup, InputGroupText, Input } from "reactstrap"
import { Search } from "react-bootstrap-icons"

export const SearchBar = () => {
  return (
    <InputGroup className="searchbar">
      <InputGroupText>
        <Search />
      </InputGroupText>
      <Input
        id="exampleSearch"
        name="search"
        placeholder="Search"
        type="search"
        className="search"
      />
    </InputGroup>
  )
}
