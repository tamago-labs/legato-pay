import { useCallback, useContext, useEffect, useState } from "react"
import BaseModal from "./Base"
import { PayContext } from "@/hooks/usePay"
import { NumberInput } from "@/components/Input"
import { Puff } from 'react-loading-icons'

const Pay = ({
    close,
    visible,
    merchant,
    channels,
    claims,
    increaseTick
}) => {

    const { pay } = useContext(PayContext)

    const channel = channels.length > 0 ? channels[channels.length-1] : undefined
    const payTo = merchant ? merchant.merchantName : ""

    const [amount, setAmount] = useState(1)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    console.log("channel : ", channel)
    console.log("merchant : ", merchant)

    const onPay = useCallback(async () => {

        setErrorMessage()
        setLoading(true)

        try {

            const { channel_id } = channel
            await pay(channel_id, amount)

            increaseTick()
            setErrorMessage(`${amount} XRP Sent`)

        } catch (e) {
            setErrorMessage(e.message)
            console.log("error : ", e)
        }

        setLoading(false)

    }, [pay, channel, amount, increaseTick])

    const paid = claims.reduce((output, item) => {
        return output + Number(item.amount)
    }, 0)

    const available = channel ? Number(channel.amount / 1000000) - paid : 0

    return (
        <BaseModal
            visible={visible}
            close={close}
            title={`Pay to ${payTo}`}
        >

            {channel && (
                <>
                    <div className="w-full mt-2 max-w-[120px] ml-auto mr-auto">
                        <div class=" w-full text-black font-medium ">
                            <div className="flex flex-row ">
                                <NumberInput
                                    value={amount}
                                    name={"amount"}
                                    handleChange={(e) => setAmount(Number(e.target.value))}
                                />
                                <div className="mt-auto mb-auto ml-2 pt-1">
                                    XRP
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-center font-medium my-2">
                            Available: {available.toLocaleString()} XRP
                        </div>


                    </div>
                    <div className="w-full max-w-[200px] ml-auto mr-auto pb-[6px] mt-4">
                        <button disabled={loading} onClick={onPay} className={`rounded-md bg-black w-full py-2 mt-auto mx-auto px-8 font-medium text-white ${loading && "opacity-80"}`}>
                            <div className="flex flex-row justify-center">
                                {loading && <Puff style={{ width: "20px", height: "20px", marginRight: "8px" }} />}
                                Send
                            </div>
                        </button>
                    </div>
                    <div className="w-full max-w-[300px] ml-auto mr-auto">
                        {errorMessage && <p className="text-xs text-center mb-1 text-blue-700 font-bold">
                            {errorMessage}
                        </p>}
                    </div>
                </>
            )

            }


        </BaseModal>
    )
}

export default Pay