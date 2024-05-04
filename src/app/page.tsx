

export default function Home() {
  return (
    <div className="flex justify-center item-center mx-72 ">
   <div> <h3 className="font-sans text-2xl text-blue-700 mt-20 ">Welcome to Dashboard</h3>
    <h4 className="font-sans text-2xl text-blue-700 mt-20 my-10 ">You can manage your products here</h4>
    <button className=" btn btn-primary pt-10">
      <a href="/products">Manage Products</a>
    </button></div>
    
    </div>
  );
}
