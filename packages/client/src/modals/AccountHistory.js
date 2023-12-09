import BaseModal from "./Base"
import { SmallBadge } from "@/components/Badge";



const AccountHistory = ({
    close,
    visible,
    claims
}) => {

    console.log("claims : ", claims)

    return (
        <BaseModal
            visible={visible}
            close={close}
            title={"Account History"}
        >
            {claims.map((item, index) => (
                <div key={index}>
                    <div className="grid grid-cols-2 border-b pt-2 pb-2 border-black text-sm sm:text-base sm:grid-cols-3 w-full ">
                        <div className="col-span-1  sm:col-span-1">
                            {new Date(item.timestamp).toLocaleString()}
                        </div>
                        <div className="col-span-1 text-right font-medium sm:col-span-1">
                            Paid: {item.amount} XRP
                        </div>
                    </div>
                </div>
            ))

            }

        </BaseModal>
    )
}

export default AccountHistory