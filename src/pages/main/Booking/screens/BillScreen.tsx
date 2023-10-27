import { Link, useSearchParams } from "react-router-dom";
import { useGetBookingByPaymentIdQuery } from "~/Redux/booking/bookingApi";

const BillScreen = () => {
    const [searchParams] = useSearchParams();
    const { data, isFetching } = useGetBookingByPaymentIdQuery(
        { payment_id: searchParams.get("payment_id") as string },
        { skip: !searchParams.get("payment_id") }
    );
    return (
        <div>
            {isFetching && <p>Loadind</p>}
            <div className="overflow-hidden">{JSON.stringify(data?.data)}</div>

            <Link to="/booking/history">
                <button className="px-5 py-2 rounded-md bg-slate-400">Xác nhận</button>
            </Link>
        </div>
    );
};

export default BillScreen;
