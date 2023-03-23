import { BidItem } from "./BidItem";

export function Catalog({ bidItems }) {
    return (
        <>
         <section className="container">
            {bidItems.map(x => <BidItem key={x._id} {...x} />)}
         </section>
        </>
    )
}