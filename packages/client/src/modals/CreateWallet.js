import BaseModal from "./Base"
import { useState, useReducer, useCallback, useContext } from "react"

import { TextArea, TextInput, NumberInput } from "@/components/Input"
import { PayContext } from "@/hooks/usePay"

import { Puff } from 'react-loading-icons'

const CreateWallet = ({
    close,
    visible,
    increaseTick
}) => {

    const initialValue = {
        merchantName: "",
        merchantAddress: "",
        jurisdiction: "",
        duty: 1000
    }

    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)

    const [values, setValues] = useReducer(
        (currentValues, newValues) => ({ ...currentValues, ...newValues }), initialValue
    )

    const { merchantName, merchantAddress, jurisdiction, duty } = values

    const { generateNewWallet, setupMultisig, sendToApi } = useContext(PayContext)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ [name]: value })
    }

    const handleTier = useCallback((event) => {
        const { name, value } = event.target
        setValues({ duty: Number(value) * 100 })
    }, [])

    const onCreateWallet = useCallback(async () => {

        setErrorMessage()

        if (!merchantName || !merchantAddress || !jurisdiction) {
            setErrorMessage("Some fields are missing")
            return
        }

        setLoading(true)

        let done = false

        try {

            const newWallet = await generateNewWallet()

            const { classicAddress } = newWallet
 
            console.log("generated : ", newWallet)

            await setupMultisig(newWallet)

            console.log("multi-sig wallet settled")

            const res = await sendToApi({
                merchantName,
                merchantAddress,
                jurisdiction,
                duty,
                masterAddress: classicAddress
            })

            done = res

        } catch (e) {
            setErrorMessage(e.message)
            console.log("error : ", e)
        }

        setLoading(false)

        if (done) {
            close()
            increaseTick()
        }

    }, [merchantName, merchantAddress, jurisdiction, duty])

    return (
        <BaseModal
            visible={visible}
            close={close}
            title={"Create Multi-Sig Wallet"}
        >
            {/* <p className="text-sm font-medium text-neutral-600">
                Create a multi-signature wallet that enables seamless collection of crypto payments for DAO
            </p> */}
            <div class=" mt-2  w-full text-black font-medium ">
                <div className=" flex items-center  ">
                    Merchant Name
                </div>
                <TextInput
                    name={"merchantName"}
                    value={merchantName}
                    handleChange={handleChange}
                    placeholder={"ex. DAOCheck LLC"}
                />
            </div>
            <div class=" mt-2  w-full text-black font-medium ">
                <div className=" flex items-center  ">
                    Merchant Address
                </div>
                <TextInput
                    name={"merchantAddress"}
                    value={merchantAddress}
                    handleChange={handleChange}
                    placeholder={"ex. 611 Beacon St. Loves Park, IL 61111 United States"}
                />
            </div>

            <div className="grid grid-cols-4">

                <div className="col-span-2">
                    {/* ENTITY JURISDICTION */}
                    <div class=" mt-2 pr-2 w-full text-black font-medium ">
                        <div className=" flex items-center  ">
                            Jurisdiction
                        </div>
                        <TextInput
                            name={"jurisdiction"}
                            value={jurisdiction}
                            handleChange={handleChange}
                            placeholder={"ex. Singapore"}
                        />
                    </div>
                </div>
                <div className="col-span-1">
                    <div class=" mt-2  w-full text-black font-medium ">
                        <div className=" flex items-center  ">
                            Duty
                        </div>
                        <div className=" flex flex-row ">
                            <NumberInput
                                value={duty / 100}
                                name={"duty"}
                                handleChange={handleTier}
                            />
                            <div className="mt-auto mb-auto ml-2 pt-1">
                                %
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div class=" mt-2  w-full text-black font-medium ">
                <div className=" flex items-center  ">
                    Required 2/3 Signatures From
                </div>
                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg  flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li class="w-full  ">
                        <div class="flex items-center ps-3">
                            <input checked id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Alice</label>
                        </div>
                    </li>
                    <li class="w-full  ">
                        <div class="flex items-center ps-3">
                            <input checked id="react-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="react-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bob</label>
                        </div>
                    </li>
                    <li class="w-full  ">
                        <div class="flex items-center ps-3">
                            <input checked id="angular-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="angular-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Charlie</label>
                        </div>
                    </li>
                    <li class="w-full  ">
                        <div class="flex items-center ps-3">
                            <input checked={false} id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dave</label>
                        </div>
                    </li>
                </ul>
                <div className="  pb-[6px] mt-2">
                    <button disabled={loading} onClick={onCreateWallet} className={`rounded-md bg-black w-full py-2 mt-auto mx-auto px-8 font-medium text-white ${loading && "opacity-80"}`}>
                        <div className="flex flex-row justify-center">
                            {loading && <Puff style={{ width: "20px", height: "20px", marginRight: "8px" }} />}
                            Create
                        </div>
                    </button>
                </div>
                <div className="w-full max-w-md ml-auto mr-auto">
                    {errorMessage && <p className="text-xs text-center mb-1 text-blue-700 font-bold">
                        {errorMessage}
                    </p>}
                    <p className="text-xs text-center font-medium text-black">
                        This will create a multi-signature wallet that enables seamless collection of crypto payments for DAO
                    </p>
                </div>
            </div>
        </BaseModal>
    )
}

export default CreateWallet