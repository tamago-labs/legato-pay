import Image from 'next/image'
import Link from 'next/link'
import { Globe } from "react-feather"
import ButtonDropdown from './ButtonDropdown'
import { useContext } from 'react'
import { PayContext } from '@/hooks/usePay'

const Header = () => {

    const { account, accounts, updateAccount } = useContext(PayContext)

    return (
        <nav
            class="w-full grid grid-cols-5 px-0 lg:px-4 py-1 gap-3">
            <div className='py-4 sm:py-2 px-1 col-span-2 sm:col-span-1'>
                <Link href="https://pay.legato.finance" >
                    <div className='flex flex-row'>
                        <Globe
                            size={28}
                        />
                        <Image
                            src="/logo.png"
                            width={100}
                            height={30}
                            alt="Logo"
                            className='ml-1'
                        />
                    </div>
                </Link>
            </div>
            <div className='col-span-1 sm:col-span-3'>
                <div class="hidden sm:block font-medium text-blue-700 lg:flex-grow">
                    <div class="container flex items-center justify-center p-4 text-black">
                        <Link className={`border-b-2 border-transparent hover:black   hover:border-black mx-1.5 sm:mx-6`} href="/">
                            Home
                        </Link>
                        {/* <Link className={`border-b-2 border-transparent hover:black   hover:border-black mx-1.5 sm:mx-6`} href="/accounts">
                            Accounts
                        </Link> */}
                        <Link className={`border-b-2 border-transparent hover:black   hover:border-black mx-1.5 sm:mx-6`} href="https://github.com/tamago-labs/legato-pay">
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
            <div className='py-2 col-span-2 sm:col-span-1 flex justify-end'>
                <div className='mr-2 text-sm mt-auto mb-auto pb-2 font-medium'>
                    Account:
                </div>
                <ButtonDropdown
                    title={account.name}
                    items={accounts.map((item) => item.name)}
                    links={accounts.map((item) => () => updateAccount(item))}
                />
            </div>

            {/* <div className='col-span-3'>
                <div class="text-md font-medium text-blue-700 lg:flex-grow">
                    <div class="container flex items-center justify-center p-4 mx-auto  capitalize  text-black">
                        <Link className={`border-b-2 ${(pathname === ("/") || pathname.includes("/new") ) ? "black border-black  " : "border-transparent hover:black hover:border-black"} mx-1.5 sm:mx-6`} href="/">
                            Overview
                        </Link>
                        <Link className={`border-b-2 ${pathname.includes("/directory") ? "black border-black  " : "border-transparent hover:black hover:border-black"} mx-1.5 sm:mx-6`} href="/directory">
                            Directory
                        </Link> 
                    </div>
                </div>
            </div>
            <div className='py-2 col-span-1 flex'>
                <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())} class={`text-black ${wallet ? "bg-transparent border-2 border-gray-600 bg-white text-black" : "bg-black text-white"} ml-auto mr-2 font-bold   text-sm py-2 px-8 rounded-md`}>
                    {connecting ? <><Puff stroke="#ffffff" style={{ height: "18px", width: "18px" }} className='mx-10' /></> : wallet ? 'Disconnect' : 'Connect Wallet'}
                </button>
            </div> */}
        </nav>
    )
}

export default Header