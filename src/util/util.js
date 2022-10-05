const handleError = (error) => {
    if (error.response && error.response.data) {
        console.log("Error: \n", error.response.data);
    } else if (error.response) {
        console.log("Error: \n", error.response);
    } else {
        console.log("Error: \n", error);
    }
};

module.exports = handleError;
