import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'react-feather'
import Link from 'next/link'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ButtonDropdown = ({
    title,
    items,
    links
}) => {

    return (
        <Menu as="div" className="relative inline-block mb-2 text-left">
            <div className='p-1'>
                <Menu.Button className=" inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black py-2 px-6 lg:px-10 font-medium text-white">
                    {title}
                    <ChevronDown aria-hidden="true" class="ml-2" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-[120px] lg:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {
                            items.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        {({ active }) => (
                                            <div
                                                onClick={links[index]}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-800',
                                                    'block px-4 py-2 font-medium text-sm'
                                                )}
                                            >
                                                {item}
                                            </div>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        } 
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ButtonDropdown