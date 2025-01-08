import WalletGraph from '../walletGraph';
import WalletProgressIcon from '../WalletProgressIcon';


const WalletProgress = () => {
    const circleStyle = {
        strokeDasharray: "400, 400",
        transition: "stroke-dashoffset 0.35s",
        transform: "rotate(-90deg)",
        transformOrigin: "50% 50%",
        stroke: "orange"
    };

    return (
        <div className="progress-chart-layer bg-white rounded-lg" >
            <div className="prograss-chart">
                <div className="balance-area">
                    <form className="balance-container  flex flex-wrap gap-4 ">
                        <fieldset className=" p-4 h-10">
                            <legend className="text-lg ">Main Balance</legend>
                            <p className="text-sm font-bold text-xl">$300,893.9</p></fieldset>
                        <fieldset className=" p-4 h-10" >
                            <legend className="text-lg " >VALID THRU</legend>
                            <p className="font-bold text-xl" >08/21</p>
                        </fieldset>
                        <fieldset className=" p-4 h-10">
                            <legend className="text-lg" >Card Holder</legend>
                            <p className="font-bold text-xl" >Samantha Anderson</p>
                        </fieldset>
                        <fieldset className=" p-4 h-10">
                            <legend className="text-lg"> &nbsp;</legend>
                            <p className="font-bold text-xl" >**** **** **** 4567</p>
                        </fieldset>
                    </form>
                </div>
                <div className="progress-bar-layer  mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 bg-gray-400 rounded-full overflow-hidden">
                        <div className="bg-orange-600 h-2.5 rounded-full w-3/4"></div>
                    </div>
                </div>
                <div className="earning-category-container flex mt-8" >
                    <div className="earning-category-layer" >
                        <h1 className="mb-1 mt-2 font-bold pl-8">Earning Category</h1>
                        <table className="table ml-8">
                            <tbody >
                                <tr>
                                    <td className="text-green-600"><WalletProgressIcon /></td>
                                    <td className="pl-2">Income</td>
                                    <td className="pl-12"> 40%</td>
                                </tr>
                                <tr>
                                    <td className="text-orange-500"><WalletProgressIcon /></td>
                                    <td className="pl-2">Expense</td>
                                    <td className="pl-12">30%</td>
                                </tr>
                                <tr>
                                    <td className="text-red-600"><WalletProgressIcon /></td>
                                    <td className="pl-2">Unknown</td>
                                    <td className="pl-12">10%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="earning-status" >
                        <div className="balance-layer-area relative w-40 h-40">
                            <div className="relative w-40 h-40 " >
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-200 stroke-current"
                                        strokeWidth="10"
                                        cx="50"
                                        cy="50"
                                        r="10"
                                        fill="white"
                                        stroke="white"
                                    ></circle>
                                    <circle
                                        className="text-indigo-500 stroke-current"
                                        style={circleStyle}
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="white"
                                        strokeDashoffset="calc(400 - (400 * 45) / 100)"
                                        stroke="white"
                                    ></circle>
                                    <text x="50" y="50" fontFamily="Verdana" fontSize="12" textAnchor="middle" alignmentBaseline="middle"></text>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="wallet-progress-graph" >
                        <WalletGraph />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default WalletProgress;
