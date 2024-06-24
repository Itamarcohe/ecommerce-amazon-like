import Title from "../components/shared/Title.jsx";
import {useEffect, useReducer} from "react";
import homePageReducer from "../reducers/homePageReducer.jsx";
import {GET_FAILURE, GET_REQUEST, GET_SUCCESS} from "../actions.jsx";
import axios from "axios";

const initialState = {
    loading: true,
    error: "",
    products: [],
}

const HomePage = () => {
    const [state, dispatch] = useReducer(homePageReducer, initialState);
    useEffect(() => {
        const getProducts = async () => {
            dispatch({type: GET_REQUEST});
            try {
                const res = await axios.get("http://localhost:8000/api/v1/products");
                dispatch({type: GET_SUCCESS, payload: res.data})
            } catch (err) {
                dispatch({type: GET_FAILURE, payload: err.message})
            }
        }

        getProducts();
    }, []);
    return(
        <div>
            <Title title="Home Page" />
            <div className="backgroundHomePage">
                <img style={{width: "100%"}} src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg" alt="backGroundHomePage"/>
            </div>
            <div className="products">
                {state.loading?
                    // (<Loading />)
                    (
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                    )
                    :
                    state.error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                        (
                            <div>
                                {state.products.map((product, index) => (
                                    <div key={index}>{product.title}</div>
                                ))}
                            </div>
                        )}
            </div>
        </div>
    )
}

export default HomePage;