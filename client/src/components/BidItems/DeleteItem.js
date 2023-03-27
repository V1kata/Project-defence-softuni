import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export function DeleteItem({ onDelete }) {
    const { itemId } = useParams();

    useEffect(() => {
        async function request() {
            await onDelete(itemId);
        }

        request();
    }, [itemId]);

    return <Navigate to="/catalog" />
}