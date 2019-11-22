module.export = {
    // Secret key for JWT signing and encryption
    // Modified this to be a decently hard to crack secret
    'secret': 'ODK5rECI*bGj4ffHg7ybtzQ2*',
    // Database connection information
    'database': 'mongodb+srv://everyone:cisc474@cluster0-ehxde.mongodb.net/test?retryWrites=true&w=majority',
    // Setting port for server
    'port': process.env.PORT || 3000
};
