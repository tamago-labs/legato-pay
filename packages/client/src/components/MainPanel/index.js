"use client";
import { useState } from 'react'
import Buyer from './Buyer';
import Merchant from './Merchant';
import ButtonDropdown from '../ButtonDropdown';

import Header from '../Header';

import PayProvider from "../../hooks/usePay"

const MainPanel = () => {

    const [tab, setTab] = useState(1)

    return (
        <PayProvider>
            <Header />

            <div className="ml-auto mr-auto w-full p-2 max-w-xl mb-20">
                
                <div className='flex flex-row justify-center '>
                    <div className='ml-1 mr-2 text-sm mt-auto mb-auto pb-2 font-medium'>
                        Mode:
                    </div>
                    <ButtonDropdown
                        title={`${tab === 0 ? "Buyer" : "Merchant"}`}
                        items={["Buyer", "Merchant"]}
                        links={[() => setTab(0), () => setTab(1)]}
                    />
                    {/* <div className="flex pb-1 ml-auto">
                         
                    </div>  */}
                </div>
                <div class="rounded-lg  border-2 border-gray-800 flex w-full p-6 py-6 m-1 bg-white ">
                    {tab === 0 && <Buyer />}
                    {tab === 1 && <Merchant />}
                </div>
                <div className='max-w-lg ml-auto mr-auto mt-3 text-xs sm:text-sm text-center font-medium text-neutral-600'>
                    You're using a development version on XRP Xahau Testnet. Please note that some functions may not work as intended.
                </div>
            </div>
        </PayProvider>
    )
}

export default MainPanel