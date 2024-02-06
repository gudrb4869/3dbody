import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { Constants } from "@videosdk.live/react-sdk";
import { useState } from "react";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
  setMeetingMode,
  meetingMode,
}) {
  const [studioCode, setStudioCode] = useState("");
  const [studioCodeError, setStudioCodeError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="flex items-center justify-center px-4 py-3 border border-gray-400 border-solid rounded-xl">
          <p className="text-base text-white">{`Studio code : ${studioCode}`}</p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(studioCode);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="w-5 h-5 text-green-400" />
            ) : (
              <ClipboardIcon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={studioCode}
            onChange={(e) => {
              setStudioCode(e.target.value);
            }}
            placeholder="Enter studio code"
            className="w-full px-4 py-3 text-center text-black bg-gray-650 rounded-xl"
          />
          {studioCodeError && (
            <p className="text-xs text-red-600">
              Please enter valid studioCode
            </p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 mt-5 text-center text-black bg-gray-650 rounded-xl"
          />
          <button
            disabled={participantName.length < 1}
            className={`w-full ${
              participantName.length < 1 ? "bg-gray-650" : "bg-purple-350"
            }  text-white px-2 py-3 rounded-xl mt-5`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                if (videoTrack) {
                  videoTrack.stop();
                  setVideoTrack(null);
                }
                onClickStartMeeting();
              } else {
                if (studioCode.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(studioCode);
                } else setStudioCodeError(true);
              }
            }} 
          >
            {iscreateMeetingClicked
              ? "Start a meeting"
              : isJoinMeetingClicked &&
                meetingMode === Constants.modes.CONFERENCE
              ? "Join Studio"
              : "Join Streaming Room"}
          </button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="flex flex-col w-full mt-4 md:mt-0">
          <div className="flex flex-col items-center justify-center w-full">
            <button
              className="w-full px-2 py-3 text-white bg-purple-350 rounded-xl"
              onClick={async (e) => {
                const studioCode = await _handleOnCreateMeeting();
                setStudioCode(studioCode);
                setIscreateMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
              }}
            >
              Create a meeting
            </button>

            <button
              className="w-full px-2 py-3 mt-5 text-white bg-purple-350 rounded-xl"
              onClick={async (e) => {
                setIsJoinMeetingClicked(true);
                setMeetingMode(Constants.modes.CONFERENCE);
              }}
            >
              Join as a Host
            </button>
          </div>
        </div>
      )}
    </div>
  );
}