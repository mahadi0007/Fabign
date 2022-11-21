import { SplitButton, Dropdown } from "react-bootstrap"

// primary dropdown
export const PrimaryDropDownBtn = (props) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm" className="rounded-0">
                {props.title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}


// secondary dropdown
export const SecondaryDropDownBtn = (props) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="gray" id="dropdown-basic" size="sm" className="rounded-0 shadow-none w-100">
                <span className="text-dark">
                    {props.title}
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu size="sm">
                {props.options && props.options.map((item, index) => {
                    return (
                        <Dropdown.Item key={index} onClick={() => props.handleSelect(item)}>{item.title}</Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}