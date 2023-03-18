import { useState } from "react"

export const useForm = (initValues) => {
    const [formValues, setFormValues] = useState(initValues);

    const onChangeHandler = (e) => {
        const target = e.target;

        setFormValues(state => ({...state, [target.name]: target.value}));
    }

    return {
        formValues,
        onChangeHandler
    }
}