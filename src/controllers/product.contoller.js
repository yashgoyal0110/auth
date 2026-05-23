const products = ['prod-A', 'prod-B', 'prod-C']

export const getProduct = (req, res) =>{
    return res.status(200).json({
        message: products
    })
}