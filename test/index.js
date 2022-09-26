export const validateJSON = string => {
    try {
        JSON.parse(string);
        return true;
    }   catch (error) {
        console.log(error.message);
        return false;
    }
}; 