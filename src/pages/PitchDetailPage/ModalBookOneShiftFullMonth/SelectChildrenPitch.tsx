import { useGetAllChildrenPitchByPitchIdQuery } from '~/Redux/pitch/pitch.api';
import Loading from '~/components/Loading';
import IChildrentPitch from '~/interfaces/childrentPitch';

interface ISelectChildrenPitch {
  setDataBooking: any;
  dataBooking: any;
  pitchId: string;
}

const SelectChildrenPitch = ({ setDataBooking, dataBooking, pitchId }: ISelectChildrenPitch) => {
  const handlePickPitch = (childrentPitch: IChildrentPitch) => {
    const _dataBooking = [...dataBooking];

    _dataBooking[0] = childrentPitch;
    setDataBooking(_dataBooking);
  };

  const { data, isFetching } = useGetAllChildrenPitchByPitchIdQuery(pitchId);

  return (
    <>
      <h2 className="text-xl font-medium leading-3">Chọn sân đá</h2>
      <hr className="my-3" />
      {isFetching ? (
        <div className="flex align-center mt-[80px] justify-center">
          <Loading />
        </div>
      ) : (
        ''
      )}
      <div className="grid grid-cols-2 gap-6">
        {data?.data.map((childrentPitch: any) => (
          <div
            key={childrentPitch._id}
            onClick={() => handlePickPitch(childrentPitch)}
            className="rounded-[10px] shadow-md overflow-hidden h-[180px] cursor-pointer hover:opacity-90 hover:shadow-xl"
          >
            <h3 className="bg-[#1fd392] text-center p-[4px] text-[18px] font-medium">Sân {childrentPitch.code_chirldren_pitch}</h3>
            <img src={childrentPitch.image} className="aspect-video object-cover" />
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectChildrenPitch;
