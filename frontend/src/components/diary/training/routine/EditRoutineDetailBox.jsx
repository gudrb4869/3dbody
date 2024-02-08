import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { BsFillTrash3Fill } from "react-icons/bs";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { baseUrlState } from "../../../recoil/common/BaseUrlState";

const EditRoutineDetailBox = ({ data, idx }) => {
  const baseUrl = useRecoilValue(baseUrlState);
  const [kg, setKg] = useState(data.kg);
  const [count, setCount] = useState(data.count);
  const [isFinished, setIsFinished] = useState(data.is_finished);
  
  const onChangeKg = (e) => {
    setKg(e.target.value);
  };

  const onChangeCount = (e) => {
    setCount(e.target.value);
  };

  // 세트 삭제 버튼
  const deleteSet = async () => {
    await axios
      .delete(
        `${baseUrl}api/management/training/set/${data.user_training_id}`
      )
      .then((res) => {
        console.table(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 세트 추가 버튼
  const postSet = async () => {
    await axios
      .post(
        `${baseUrl}api/management/training/set/${data.user_training_id}`
      )
      .then((res) => {
        console.table(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <p>
        <span className="font-semibold text-teal-700">{idx + 1}</span>{" "}
        {"운동 이름 주세요."}
      </p>
      <hr className="my-2" />
      <p className="my-1 text-sm">총 볼륨 {data.count * data.kg}kg</p>

      <table className="w-full">
        <thead>
          <tr className="text-gray-400 ">
            <th>세트</th>
            <th>kg</th>
            <th>회</th>
            <th>완료</th>
          </tr>
        </thead>
        <tbody>
          {data.sets.map((set, setIdx) => (
            <tr key={setIdx} className="text-center">
              <td>{setIdx + 1}</td>
              <td>
                <form>
                  <input
                    className="w-16 mx-2 text-center border"
                    value={kg}
                    onChange={onChangeKg}
                  />
                </form>
              </td>
              <td>
                <form>
                  <input
                    className="w-16 mx-2 text-center border"
                    value={count}
                    onChange={onChangeCount}
                  />
                </form>
              </td>
              <td className="flex justify-center">
                {isToday() ? (
                  <input
                    type="checkbox"
                    className="w-5 h-5 mt-1 accent-teal-600"
                    onChange={() => putIsFinished()}
                    checked={isFinished}
                  />
                ) : (
                  <BsFillTrash3Fill className="w-6 h-6" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 pt-4 pb-2 text-center divide-x-2">
        <button className="flex justify-center gap-2" onClick={() => deleteSet()}>
          <MinusIcon className="w-6 h-6" />
          세트 삭제
        </button>
        <button className="flex justify-center gap-2 text-teal-700" onClick={() => postSet()}>
          <PlusIcon className="w-6 h-6" />
          세트 추가
        </button>
      </div>
    </>
  );
};

EditRoutineDetailBox.propTypes = {
  data: PropTypes.object,
  idx: PropTypes.number,
};

export default EditRoutineDetailBox;