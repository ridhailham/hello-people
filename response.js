const response = (statusCode, data, massage, res) => {
    res.json(statusCode, [
        {
            payload: data,
            massage,
            metadata: {
                prev: "",
                next: "",
                current: "",
            },
        }
    ])
}

module.exports = response