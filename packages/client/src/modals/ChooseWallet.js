import { useCallback, useContext, useEffect, useState } from "react"
import BaseModal from "./Base"
import { PayContext } from "@/hooks/usePay"
import { faker } from '@faker-js/faker';
import { SmallBadge } from "@/components/Badge";
import { ArrowLeft } from "react-feather";
import { NumberInput } from "@/components/Input";

import { Puff } from 'react-loading-icons'

const Row = ({ title, value }) => {
    return (
        <div className="grid grid-cols-5 border-b pt-2 pb-2 border-black text-sm sm:text-base sm:grid-cols-3 w-full ">
            <div className="col-span-2 font-medium sm:col-span-1">
                {title}
            </div>
            <div className="col-span-3  sm:col-span-2">
                {value}
            </div>
        </div>
    )
}

const WalletItem = (item) => {

    const [channels, setChannels] = useState([])

    const { listChannels } = useContext(PayContext)

    useEffect(() => {
        item && listChannels(item.masterAddress).then(setChannels)
    }, [item])

    return (
        <>
            <div className="border-2 cursor-pointer  text-xs sm:text-sm border-gray-400 hover:border-black bg-neutral-100 rounded-md">
                <div className="w-full mt-1 text-xs text-center text-black font-bold">
                    {item.merchantName}
                </div>
                <div className="flex py-1">
                    <div className="w-1/2 ml-auto mr-auto">
                        <img src={faker.image.urlLoremFlickr({ category: "logo" })} alt="" />
                    </div>
                </div>
                <div className="w-full mb-1 text-xs text-center text-black ">
                    <SmallBadge value={channels.length !== 0 ? <>{`${(Number(channels[channels.length-1].amount) / 1000000).toLocaleString()} `}XRP</> : "Closed"} />
                </div>
            </div>
        </>
    )
}

const ChooseWallet = ({
    close,
    visible
}) => {

    const [wallets, setWallets] = useState([])
    const [selected, setSelected] = useState()

    const [channels, setChannels] = useState([])

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const [tick, setTick] = useState(0)

    // const [amount, setAmount] = useState(10)

    useEffect(() => {
        selected ? listChannels(selected.masterAddress).then(setChannels) : setChannels([])
    }, [selected, tick])

    const { listAllMerchants, openChannel, listChannels, setMerchant } = useContext(PayContext)

    useEffect(() => {
        listAllMerchants().then(setWallets)
    }, [])

    const increaseTick = useCallback(() => {
        setTick(tick + 1)
    }, [tick])

    const onOpenChannel = useCallback(async () => {

        setErrorMessage()
        setLoading(true)

        try {

            const { masterAddress } = selected

            await openChannel(10, masterAddress)

            increaseTick()

        } catch (e) {
            setErrorMessage(e.message)
            console.log("error : ", e)
        }

        setLoading(false)

    }, [selected, openChannel, increaseTick])

    const onChoose = useCallback(() => {

        setMerchant(selected)
        close()
        setSelected()

    }, [selected])

    return (
        <BaseModal
            visible={visible}
            close={() => {
                close()
                setSelected()
            }}
            title={"Choose Merchant"}
        >

            {!selected && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-2 w-full ">
                    {wallets.map((item, index) => {
                        return (
                            <div key={index} onClick={() => setSelected(item)} className="col-span-1">
                                <WalletItem {...item} />
                            </div>
                        )
                    })}
                </div>
            )}


            {selected && (
                <>
                    <div className="w-full mt-4 flex flex-col">

                        <div onClick={() => setSelected()} className="text-xs cursor-pointer font-medium flex flex-row">
                            <ArrowLeft size={14} className="mr-[1px]" />{` `}Back
                        </div>

                        <Row
                            title={"Merchant Name"}
                            value={selected.merchantName}
                        />
                        <Row
                            title={"Merchant Address"}
                            value={selected.merchantAddress}
                        />
                        <Row
                            title={"Jurisdiction"}
                            value={selected.jurisdiction}
                        />
                        <Row
                            title={"Duty"}
                            value={`${selected.duty / 100}%`}
                        />

                        {channels.length === 0 && (
                            <>
                                <div className="  pb-[6px] mt-4">
                                    <button disabled={loading} onClick={onOpenChannel} className={`rounded-md bg-black w-full py-2 mt-auto mx-auto px-8 font-medium text-white ${loading && "opacity-80"}`}>
                                        <div className="flex flex-row justify-center">
                                            {loading && <Puff style={{ width: "20px", height: "20px", marginRight: "8px" }} />}
                                            Open Payment Channel
                                        </div>
                                    </button>
                                </div>

                                <div className="w-full max-w-md ml-auto mr-auto">
                                    {errorMessage && <p className="text-xs text-center mb-1 text-blue-700 font-bold">
                                        {errorMessage}
                                    </p>}
                                    <p className="text-xs text-center font-medium text-black">
                                        This will open a payment channel between your account and the merchant and depositing 10 XRP into the channel
                                    </p>
                                </div>
                            </>
                        )}
                        {channels.length > 0 && (
                            <>
                                <div className="  pb-[6px] mt-4">
                                    <button onClick={onChoose} className={`rounded-md bg-black w-full py-2 mt-auto mx-auto px-8 font-medium text-white`}>
                                        <div className="flex flex-row justify-center">
                                            Choose
                                        </div>
                                    </button>
                                </div>

                            </>
                        )}

                    </div>
                </>
            )}

        </BaseModal>
    )
}

export default ChooseWallet