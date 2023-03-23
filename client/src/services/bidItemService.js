import { requestFactory } from "../utils/bidItemUtils"

export function bidItemRequest(token) {
    const request = requestFactory(token);

    const getAll = async () => {
        const data = await request.get('/bidItems');

        return data.bidItem;
    }

    const getById = async (id) => {
        const data = request.get(`/bidItems/${id}`);

        return data.bidItem;
    }

    const createItem = async (value) => {
        const data = request.post('/bidItems', value);

        return data.bidItem;
    }

    const editItem = async (id, value) => {
        const data = request.post(`/bidItems/${id}`, value);

        return data.bidItem;
    }

    return {
        getAll,
        getById,
        createItem,
        editItem
    };
}