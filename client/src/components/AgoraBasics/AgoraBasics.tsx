import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState } from "react";

import "./styles.css";
// import agoraLogo from "./agora-logo.svg";

export const Basics = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected(); // Store the user's connection status
  const [token, setToken] = useState("");
  const appId = "6ff007d425b447a9bb5bdcf45d95eff3";
  const channel = "test";

  useJoin(
    { appid: appId, channel: channel, token: token ? token : null },
    calling
  );

  const [micOn, setMic] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  usePublish([localMicrophoneTrack]);

  const remoteUsers = useRemoteUsers();

  return (
    <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalUser
                audioTrack={null}
                micOn={micOn}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <samp className="user-name">You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            <input
              onChange={(e) => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
            />

            <button
              className={`join-channel ${!appId || !channel ? "disabled" : ""}`}
              disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic((a) => !a)}>
              <span>microphone off button</span>
              <i className={`i-microphone ${!micOn ? "off" : ""}`} />
            </button>
          </div>
          <button
            className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
            onClick={() => setCalling((a) => !a)}
          >
            {calling ? (
              <div>
                <span>hangup button</span>
                <i className="i-phone-hangup" />
              </div>
            ) : (
              <div>
                <span>call button</span>
                <i className="i-mdi-phone" />
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default Basics;
