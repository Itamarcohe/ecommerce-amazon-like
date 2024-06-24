import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

const Title = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Title;
