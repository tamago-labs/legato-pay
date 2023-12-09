


export const TextInput = ({
    placeholder,
    name,
    value,
    handleChange
}) => {
    return (
        <input onChange={handleChange} value={value} name={name} class="rounded-md mt-2 py-3 pl-3 pr-10 text-left  w-full  sm:text-sm sm:leading-6 bg-white border-2 border-gray-600  placeholder-gray-400 font-medium text-black   leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={placeholder} />
    )
}

export const NumberInput = ({
    name,
    value,
    handleChange
}) => {
    return (
        <input onChange={handleChange} min={0} max={80} value={value} name={name} class="rounded-md mt-2 py-3 pl-3 pr-3  text-right  w-full    sm:text-sm sm:leading-6 bg-white border-2 border-gray-600  placeholder-gray-400 font-medium text-black   leading-tight focus:outline-none focus:shadow-outline" type="number" />
    )
}

export const TextArea = ({
    placeholder,
    name,
    value,
    handleChange
}) => {
    return (
        <textarea onChange={handleChange} value={value} name={name} rows="3" class="rounded-md mt-2 py-3 pl-3 pr-10 text-left  w-full  sm:text-sm   bg-white border-2 border-gray-600  placeholder-gray-400 font-medium text-black   focus:outline-none focus:shadow-outline" type="text" placeholder={placeholder} />
    )
}

