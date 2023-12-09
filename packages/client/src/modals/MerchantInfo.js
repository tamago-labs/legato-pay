import BaseModal from "./Base"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from "react-feather";
import { shortAddress } from "@/utils";
import { SmallBadge } from "@/components/Badge";
import { faker } from '@faker-js/faker';

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

const MerchantInfo = ({
    close,
    visible,
    merchant
}) => {

    const title = merchant ? merchant.name : ""

    return (
        <BaseModal
            visible={visible}
            close={close}
            title={title}
        >

            {merchant && (
                <div className="w-full mt-4 flex flex-col">
                    
                    <img src={faker.image.urlLoremFlickr({ category :"logo"})} className="w-1/2 sm:w-1/3 mr-auto ml-auto mb-4" alt=""/>

                    <Row
                        title={"Merchant Name"}
                        value={merchant.merchantName}
                    />
                    <Row
                        title={"Merchant Address"}
                        value={merchant.merchantAddress}
                    />
                    <Row
                        title={"Jurisdiction"}
                        value={merchant.jurisdiction}
                    />
                    <Row
                        title={"Duty"}
                        value={`${merchant.duty / 100}%`}
                    />
                    <div className="my-2 ">
                        <div className="font-medium text-center">
                            Multi-Signature Wallet Address
                        </div>
                        <CopyToClipboard text={merchant.masterAddress}>
                            <div className="text-sm sm:text-base mb-1 text-center flex flex-row justify-center items-center">
                                <div className="mt-auto mb-auto cursor-pointer">
                                    {merchant.masterAddress}
                                </div>
                                <button className="ml-1 cursor-pointer">
                                    <Copy size={16} />
                                </button>
                            </div>
                        </CopyToClipboard>
                         <div className="text-xs text-center  ">
                        Required 2/3 signatures from{` `}<SmallBadge value={"Alice"}/>{` `}<SmallBadge value={"Bob"}/>{` `}<SmallBadge value={"Charlie"}/>
                    </div>
                    </div>
                   
                </div>
            )}

        </BaseModal>
    )
}

export default MerchantInfo