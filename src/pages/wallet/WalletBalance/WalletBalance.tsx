import waletlogo from "../../../../public/Walletimage/Vector.png"
import Image from "next/image";
import { FaFile } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
function WalletBalance (){
    return (
        <div className="wallet-balance-container bg-orange-500 rounded-2xl border border-gray-300" >
            <div className="toggle-btn-layer">
                <div className="wallet-logo-layer pl-4 pt-5">
                    <Image src={waletlogo} alt="Logo" className="logo-image-reset cursor-pointer" />
                </div> 
                <h1 className="text-white pl-3 pt-3 text-2xl font-bold">$300,893,9</h1>
                <h1 className="text-white pl-3 pt-1">Wallet Balance</h1>
                <p className="text-white pl-3 pt-3">+0.8% than last week</p>
                <div className="wallet-btn-layer bg-white  justify-between flex rounded-2xl m-2 border-gray-300 p-2  p-2">
                    <div>
                        <div className="top-up-btn h-8  cursor-pointer flex items-center  justify-center rounded-lg ml-3 mt-2" style={{ background: "#98c75e", height: "50px", width: "50px" }}>
                            <FaFile className="h-5 text-green-800" />
                        </div>
                        <h1 className="text-sm font-bold ml-3">Top up</h1>
                    </div>
                    <div>
                        <div className="withdraw-btn h-8 flex items-center cursor-pointer justify-center rounded-lg mt-2" style={{ background: "#ca8787", height: "50px", width: "50px" }}>
                        <FaArrowUp className="h-5 text-red-800" />
                        </div>
                        <h1 className="text-sm font-bold ">Withdraw</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WalletBalance;
