import { PayContext } from "@/hooks/usePay"
import CreateWallet from "@/modals/CreateWallet"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from "react-feather";
import QRCode from "react-qr-code";
import { useCallback, useContext, useEffect, useState } from "react"
import { Plus } from "react-feather"
import { shortAddress } from "@/utils";
import MerchantInfo from "@/modals/MerchantInfo";

const Merchant = () => {

    const [modal, setModal] = useState(false)
    const [merchant, setMerchant ] = useState(undefined)

    const { listMerchants, account } = useContext(PayContext)
    const [wallets, setWallets] = useState([])

    const [tick, setTick] = useState(0)

    useEffect(() => {
        listMerchants().then(setWallets)
    }, [account, tick])

    const increaseTick = useCallback(() => {
        setTick(tick + 1)
    }, [tick])

    return (
        <>
            <CreateWallet
                visible={modal}
                close={() => setModal(false)}
                increaseTick={increaseTick}
            />

            <MerchantInfo
                visible={merchant !== undefined}
                close={() => setMerchant(undefined)}
                merchant={merchant}
            />

            <div className="w-full flex flex-col">

                <div className="grid grid-cols-2 sm:grid-cols-3 mb-4 w-full ">
                    {wallets.map((item, index) => {
                        return (
                            <div key={index} className="col-span-1 p-1 ">
                                <div className="border-2 border-black bg-neutral-100 rounded-md mx-2">
                                    <div className="w-full mt-1 text-xs text-center text-black font-bold">
                                        {/* {template.duty}{` +`}{item.dutyRate / 100}% */}
                                        {item.merchantName}
                                    </div>
                                    <div onClick={() => setMerchant({
                                         ...item
                                    })} className="flex cursor-pointer py-1">
                                        <div className="w-1/2 ml-auto mr-auto">
                                            <QRCode
                                                size={100}
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                value={item.masterAddress}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-xs text-center text-black font-bold">
                                        {/* {item.jurisdiction} */}
                                    </div>
                                    <CopyToClipboard text={item.masterAddress}>
                                        <div className="text-xs mb-1 text-center flex flex-row justify-center items-center">
                                            <div className="mt-auto mb-auto cursor-pointer">
                                                {shortAddress(item.masterAddress)}
                                            </div>

                                            <button className="ml-1 cursor-pointer">
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                    </CopyToClipboard>

                                </div>

                            </div>
                        )
                    })

                    }
                </div>

                <div className="ml-auto mr-auto w-full max-w-sm flex">
                    <button onClick={() => setModal(true)} className="rounded-md bg-black py-2 mt-auto w-[300px] mx-auto px-8 font-medium text-white ">
                        +{` `}
                        Multi-Sig Wallet
                    </button>
                </div>
                <div class="w-full mt-6 grid grid-cols-7 text-xs sm:text-sm gap-1 sm:gap-3 text-neutral-900 font-medium">
                    <div className="col-span-2 text-right font-semibold">
                        What is Merchant?
                    </div>
                    <div className="col-span-5  leading-[12px]  sm:leading-[18px]   flex">
                        The merchant receives payment from the buyer. It works by having a Multi-Sig wallet for each different duty tier managed by XRPL Hooks
                    </div>
                </div>
            </div>
        </>

    )
}

export default Merchant