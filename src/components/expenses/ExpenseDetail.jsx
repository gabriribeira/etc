import BottomBar from "../common/BottomBar";
import TopBar from "../common/TopBar";

const ExpenseDetail = () => {
  

  return (
    <>
    <TopBar />
    <main className="mt-16">
    <div className=" p-4 rounded-xl">
      <div className="bg-black shadow-lg rounded-2xl p-4 mb-4 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl">Jantar</h2>
          <p className="text-sm">paid by Leo</p>
        </div>
        <div className="text-2xl font-semibold text-red-500">
          70€
        </div>
      </div>
      <div className="mb-4">
        Members
        
      </div>
      <div className="bg-black10 rounded-full px-4 py-2 mb-2 flex justify-between">
        <p className="text-gray-600">Date</p>
        <p>20/05/2024</p>
      </div>
      <div className="bg-black10 rounded-full px-4 py-2 flex justify-between">
        <p className="text-gray-600">Category</p>
        <p>Food</p>
      </div>
    </div>
    </main>
    <BottomBar />
    </>
  );
};

export default ExpenseDetail;
