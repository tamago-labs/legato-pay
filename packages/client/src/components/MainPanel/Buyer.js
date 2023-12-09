
import { PayContext } from "@/hooks/usePay"
import ChooseWallet from "@/modals/ChooseWallet"
import { useContext, useEffect, useState } from "react"
import { Radio, Activity, Truck } from "react-feather"


const MODAL = {
    NONE: "NONE",
    CHOOSE_MERCHANT: "CHOOSE_MERCHANT"
}

const Buyer = () => {

    const { balance, merchant } = useContext(PayContext)
    const [errorMessage, setErrorMessage] = useState()

    const [modal, setModal] = useState(MODAL.NONE)

    useEffect(() => {
        merchant ? setErrorMessage() : setErrorMessage("Merchant is not selected")
    }, [merchant])

    return (
        <>
            <ChooseWallet
                visible={modal === MODAL.CHOOSE_MERCHANT}
                close={() => setModal(MODAL.NONE)}
            />

            <div className="w-full flex flex-col">
                <div className="ml-auto mr-auto w-full max-w-sm ">
                    <div class="w-full grid grid-cols-5  gap-3 text-neutral-800 font-medium">
                        <div className="col-span-2 text-center text-lg">
                            Balance
                        </div>
                        <div className="col-span-3  text-sm flex">
                            <div className="m-auto flex flex-row">
                                <Radio className="w-[20px] mr-1" />
                                <div className="mt-auto mb-auto">
                                    XRP Xahau Testnet
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-auto mr-auto w-full my-8 text-4xl text-neutral-900 font-bold text-center max-w-sm ">
                    {Number(balance).toLocaleString()} XRP
                </div>
                <div className="ml-auto mr-auto w-full max-w-sm flex">
                    <button disabled={!merchant} onClick={() => alert(true)} className={`rounded-md bg-black py-2 mt-auto w-[300px] mx-auto px-8 font-medium text-white ${!merchant && "opacity-80"}`}>
                        Pay
                    </button>
                </div>
                <div className="w-full max-w-md ml-auto my-1 mr-auto">
                    {errorMessage && <p className="text-xs text-center   text-blue-700 font-bold">
                        {errorMessage}
                    </p>}
                </div>
                <div className="ml-auto mr-auto w-full max-w-sm mt-0 mb-4 flex">
                    <div class="inline-flex rounded-md ml-auto mr-auto" role="group">
                        <button onClick={() => setModal(MODAL.CHOOSE_MERCHANT)} type="button" class="  items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-md border-r-0 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                            <Truck
                                className="ml-auto mr-auto mb-1"
                            />
                            Choose Merchant
                        </button>

                        <button type="button" class="items-center  px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                            <Activity
                                className="ml-auto mr-auto mb-1"
                            />
                            Account History
                        </button>
                    </div>
                </div>
                <div class="w-full  grid grid-cols-7 text-xs sm:text-sm gap-1 sm:gap-3 text-neutral-900 font-medium">
                    <div className="col-span-2 text-right font-semibold">
                        What is Buyer?
                    </div>
                    <div className="col-span-5  leading-[12px]  sm:leading-[18px]   flex">
                        The buyer pays the merchant for products or services with XRP. The current system employs a pre-defined list of accounts that can be seen on the top right
                    </div>
                </div>
            </div>
        </>
    )
}

export default Buyer