import { Button } from "reactstrap"

const FilterButton = ({ name, isPressed, setFilter }) => {
  return (
    <Button
      color="dark"
      type="button"
      className="mx-2"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </Button>
  )
}

export default FilterButton
