import { useLoaderData } from "react-router-dom";
import { Link, useLoaderData }  from    "react-router-dom";

const ProductDetailPage = () => {       
    const product = useLoaderData();       
    return ( 
    <>  
    <div className="item">
        {product ? (
            <> 
            <h2>{product.name}</h2>
            <div><span>Id:</span> {product.id}</div>
            <div><span>Category:</span> {product.category}</div>
            <div><span>Price:</span> {product.price}</div>
            {product.stocked ? (
                <div className="info">Available</div>
            ) : (
                <div className="danger">Out of stock</div>
            )} 
            <div><span>Detail:</span>{product.detail}</div>
            </>   
        ) : (
            <div>No such product!</div>        
        )} 
        </div>       
    </>         
    );  
};       
export async function loader({ params }) {   
    const res = await getProduct(params.id);   
    return res;    
} 
export default ProductDetailPage; 