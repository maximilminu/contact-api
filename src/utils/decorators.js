const withLogging = (handler, actionDescription = "Request handled") => {
  
    return (req, res) => {
        console.log("LOGGING")

      console.log(`[${new Date().toISOString()}] METHOD: ${req.method} - URL: ${req.originalUrl}`); 
      
      Promise.resolve(handler(req, res))
        .then(() => {
          console.log(`[${new Date().toISOString()}] Success: ${actionDescription}`); 
        })
        
        .catch((error) => {
          console.error(`[${new Date().toISOString()}] Error: ${error.message}`); 
          res.status(500).json({ error: "Internal Server Error" });
        });
    };
  };

module.exports = withLogging;
