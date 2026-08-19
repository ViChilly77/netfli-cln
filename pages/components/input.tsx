import React from "react";

// Props for the Input component 
interface InputProps {
    id: string;  // Unique identifier for the input field
    onChange: any;  //registered event handler for input changes
    value: string;  // Current value of the input field
    label: string;  // Label for the input field
    type?: string;  // Type of the input field & ? is for optional prop

}

// destruction is used to extract the properties from the props object passed to the Input component. This allows us to use the individual properties directly in the component without having to reference them through props.id, props.onChange, etc.
const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => { //destructuring the props passed to the Input component
    return (
        <div className="relative">
            <input 
            // using the destructured props to set the attributes of the input element. This allows the Input component to be reusable and customizable based on the props passed to it.
                id={id} //
                onChange={onChange}
                value={value}
                type={type} 
                className="
                    block
                    rounded-md
                    px-6
                    pt-6
                    pb-1
                    w-full
                    text-md
                    text-white
                    bg-neutral-700
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    peer
                "
                placeholder=" "
            />
                <label
                className="
                    absolute
                    text-md
                    text-zinc-400
                    duration-150
                    transform
                    -translate-y-3
                    top-4
                    z-10
                    origin-[0]
                    left-6
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                "
                htmlFor={id}>
                {label}
                </label>
            
        </div>
    )
}

export default Input;