// Define the Person constructor
module.exports = {
    
    SMARTCAR_ERROR_CODE: {
        SUCCESS:   0, 
        INVALID_INPUT:   -1,
        REMOTE_SERVER_ERROR:   -2,
        UNKNOWN_COMMAND:   -3,
    },
    
    SmartCarResponse: function() {
        this.errorCode;
        this.httpResponseInfo;
        this.data;
    }
    


}