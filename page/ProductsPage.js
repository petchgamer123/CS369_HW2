import {
	Link,
	Form,
	useLoaderData,
	useSearchParams,
	useSubmit,
} from 'react-router-dom'

const initData = [   
    { category: "Sporting Goods", id: "1234", name: "Football", price: 49.99, stocked: true, },   
    { category: "Sporting Goods", id: "3444", name: "Baseball", price: 9.99,  stocked: true, },   
    { category: "Sporting Goods", id: "1344", name: "Basketball", price: 29.99, stocked: false},
    { category: "Electronics", id: "3422", name: "iPod Touch", price: 99.99, stocked: true, },   
    { category: "Electronics", id: "2567", name: "iPhone 5", price: 399.99, stocked: false, },  
    { category: "Electronics", id: "3214", name: "Nexus 7", price: 199.99, stocked: true, },
    { category: "Kitchenware", id: "1414", name: "Pot", price: 9.99, stocked: true, },   
    { category: "Kitchenware", id: "1456", name: "Pan", price: 6.99, stocked: true, },
]; 
const ProductsPage = () => {    
    const [searchParams, setSearchParams] = useSearchParams();   
    const q = searchParams.get('q'  );     
    console.log(q);
    const submit = useSubmit();

    const resetSearch = (e) => {        
        // we still want the reset form behavior, so do NOT prevent default 

        // need to clear the searchParams on the URL       
        const param = searchParams.get("q"  );         
        if   (param) {
            searchParams.delete("q");  
            setSearchParams(searchParams);    
        }    
    }; 

    const products = useLoaderData();   
    const list = products.map((e) => (        
        <Link key  ={e.id} to ={e.id}> 
            <li title={e.category}>{e.name}</li>       
        </Link>   
    ));      
    
    return (       
        <>  
        <Form id="search-form" role="search"> 
                <fieldset>
                    <legend>Search</legend>
                    <input 
                        id= "q" 
                        placeholder="Search" 
                        type="search" 
                        name  ="q"
                        defaultValue={q} 
                        // onChange={(event) => { 
                        //     const isFirstSearch = q == null; 
                        //     submit(event.currentTarget.form, { 
                        //         replace: !isFirstSearch,
                        //     });                   
                        // }} 
                        onChange={(event) => { 
                            submit(event.currentTarget.form);                
                        }}
                    />
                    <input type   ="reset" onClick={resetSearch} />  
                </fieldset>
            </Form>
            <hr/>

        {products.length ? (
            <ul   className="list-item">{list}</ul>
        ) : (
            "No product available"      
        )}       
        <BreadCrumbs />
        </> 
    );

}; 
// export async function productsLoader({ request }) {   
//     const url = new   URL(request.url);   
//     const q = url.searchParams.get("q");   
//     const products = await getProducts(q);   
//     return products;
// } 

export const productsLoader = async () => {    
    const res = await getProducts();   
    return res;    
}; 
export default ProductsPage;