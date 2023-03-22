import { useState } from "react"

export const useForm = (initValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initValues);

    const onChangeHandler = (e) => {
        const target = e.target;

        setFormValues(state => ({...state, [target.name]: target.value}));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(formValues);
    }

    const changeValues = (newValues) => {
        setFormValues(newValues)
    }

    return {
        formValues,
        onChangeHandler,
        onSubmit,
        changeValues
    }
}