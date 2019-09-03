exports.postPdf = (req, res, next) => {
    if (!req.file) {
        const error = new Error('No file provided.');
        error.statusCode = 422;
        throw error;
    }
    res.status(200).json({msg:'file uploaded'});
};


