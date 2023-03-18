import { BidItem } from "./BidItem";

export function Catalog({ bidItems }) {

    return (
        <>
            {bidItems.map(x => <BidItem key={x._id} {...x} />)}
        </>
    )
}