import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const SearchBox = () => {
    return(
        <Form className="d-flex me-auto w-50">
            <InputGroup>
                <FormControl aria-describedby="button-search" placeholder="Search" type="text" name="q" id="q">
                </FormControl>
                <Button variant="outline-primary" type="submit" id="button-search">
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBox;