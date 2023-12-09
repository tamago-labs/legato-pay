
import { PayContext } from "@/hooks/usePay"
import { useContext } from "react"
import { Radio } from "react-feather"


const Buyer = () => {

    const { balance } = useContext(PayContext)

    return (
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
                <button onClick={() => alert(true)} className="rounded-md bg-black py-2 mt-auto w-[300px] mx-auto px-8 font-medium text-white ">
                    Pay
                </button>
            </div>

            <div className="ml-auto mr-auto w-full max-w-sm my-6 mb-4 flex">
                <div class="inline-flex rounded-md ml-auto mr-auto" role="group">
                    <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                        <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        Profile
                    </button>
                    <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                        <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                        </svg>
                        Settings
                    </button>
                    <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                        <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                        </svg>
                        Downloads
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
    )
}

export default Buyer