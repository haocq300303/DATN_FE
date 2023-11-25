import { Empty, Form, Input, Rate, message } from 'antd';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import IPitch from '~/interfaces/pitch';
import { useAppDispatch, useAppSelector } from '~/Redux/hook';
import { fetchAllFeedback, fetchCreatFeedback } from '~/Redux/Slices/feedback';
import { useParams } from 'react-router-dom';
import { totalStarByPitch } from '~/api/feedback';


const FeedBack = ({ idPitch }: { idPitch: IPitch }) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [feedbackList, setFeedbackList] = useState<string[]>([]);
    const [TotalStar, setTotalStar] = useState<any>(Number)

    console.log("feedback_id:", feedbackList);
    console.log("totalStar:", TotalStar?.averageRating);


    useEffect(() => {
        const fedId: any = idPitch?.feedback_id;
        if (fedId) {
            setFeedbackList(fedId);
        }
    }, [idPitch]);
    const feedback = useAppSelector((state) => state.feedback.feedbacks);

    useEffect(() => {
        dispatch(fetchAllFeedback());
    }, [dispatch]);

    // Xử lý totalStar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await totalStarByPitch(String(id));
                const { data } = response.data;
                setTotalStar(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleRateChange = async (value: number) => {
        console.log('Giá trị đánh giá:', value);
    };


    const onFinish = async (values: any) => {
        try {
            const reponse = await dispatch(fetchCreatFeedback(values));
            console.log("dataApit:", reponse);
            if (reponse?.meta?.requestStatus === "fulfilled") {
                message.success("Đánh giá Thành Công !");
            }

            const id_feback: string = reponse?.payload?._id;
            console.log(id_feback);
            if (id_feback) {
                setFeedbackList(prevFeedbackList => [...prevFeedbackList, id_feback]);
            }

            await dispatch(fetchAllFeedback());

            const response = await totalStarByPitch(String(id));
            const { data } = response.data;
            setTotalStar(data);
        } catch (error: any) {
            console.log(error);
        }
    };
    return (
        <div >
            <div>
                <h1>Khách hàng vui lòng đánh giá theo mức độ 1 - 5 sao !</h1>
                <div className='mt-[20px] flex justify-between'>
                    <div>
                        <Form onFinish={onFinish} className='flex gap-4'>
                            <div>
                                <Form.Item name="quantity_star" initialValue={5}>
                                    <Rate onChange={handleRateChange} />
                                </Form.Item>
                                <Form.Item hidden name="id_user" initialValue="655f1711c3dfbd0adea3ce3e">
                                    <Input className="bg-white" disabled />
                                </Form.Item>
                                <Form.Item hidden name="id_pitch" initialValue={id!}>
                                    <Input className="bg-white" disabled />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item>
                                    <Button
                                        className="text-blue-500 border-blue-500 hover:text-blue-900 hover:border-blue-900 mx-2"
                                        htmlType="submit"
                                    >
                                        Đánh Giá
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                    <div>
                        <span>Tổng Đánh Giá : </span>
                        <Rate allowHalf disabled value={TotalStar?.averageRating} />
                        <span className='pl-[5px] pb-[5px] font-[400]'>{TotalStar?.averageRating?.toFixed(1)}</span>
                    </div>
                </div>
                <div className='border-b-[3px] mt-[20px] border-gray-700'></div>
                <div className=' overflow-y-scroll h-[450px]'>
                    {feedbackList && feedbackList.length > 0 ? (
                        feedbackList?.slice()?.reverse()?.map((data: any) => {

                            const feed = feedback?.find(
                                (item: any) => item._id == data
                            );
                            if (!feed) {
                                return null;
                            }

                            return (
                                <div key={feed?._id} className='mx-[10px]'>
                                    <article className='flex justify-between mx-[10px] my-[10px]'>
                                        <div className="flex items-center mb-4">
                                            <img className="w-10 h-10 me-4 rounded-full" src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg" alt="" />
                                            <div className="font-medium dark:text-white">
                                                <p>{feed?.id_user?.name} </p>
                                                <p className='text-[13px] dark:text-white/50'>Thời Gian: <span className='text-black/50'>{feed?.updatedAt}</span></p>
                                            </div>
                                        </div>
                                        <div className=" mb-1 space-x-1 rtl:space-x-reverse">
                                            <h2>Chất Lượng Được Đánh Giá !</h2>
                                            <Rate className='text-[20px]' disabled value={feed?.quantity_star} />
                                        </div>
                                    </article>
                                    <div className='border-b-[1px] mt-[20px] border-gray-500'></div>
                                </div>
                            );
                        })
                    ) : (
                        <div>
                            <h1 className='text-center mt-[20px] text-[15px]'>Bạn hay là người đánh giá đầu tiên !</h1>
                            <p><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FeedBack


