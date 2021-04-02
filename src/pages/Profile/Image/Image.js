import React, { useState, useRef, useEffect } from "react"
import styles from "./Images.module.css"
import { CallToActionButton } from "../../../components/Button"


export default function CaptureImage({ onCaptureHandler }) {

  const [imageURL, setImageURL] = useState("")

  const videoRef = useRef();
  const canvasRef = useRef();
  const imageRef = useRef();

  const width = 720

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {


    navigator.mediaDevices
      .getUserMedia({ video: { width: width, height: width * (2 / 3) } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takePhoto = () => {
    let video = videoRef.current;
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    const canvas_width = width;
    const canvas_height = width * (2 / 3);
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    ctx.drawImage(video, 0, 0, canvas_width, canvas_height);
    const imageDataURL = canvas.toDataURL('image/png');
    onCaptureHandler(imageDataURL)
    return setImageURL(imageDataURL)
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });
  }

  return (
    <>
      <div>
        <video ref={videoRef} />
        {/* <img className={styles.image} src={imageURL} ref={imageRef} /> */}
        <CallToActionButton value="Snap Picture" onClick={takePhoto} />
        <canvas ref={canvasRef} style={{ display: 'none' }}>
        </canvas>
      </div>
    </>
  )
}

