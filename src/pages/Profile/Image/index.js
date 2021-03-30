import styles from "./Images.module.css"
import Layout from "../../../containers/Layout/index"
import { useState } from "react"

import Image from "./Image"

export default function ImagePageComponent() {
  // Have to get list from server
  const images_initial = [];
  const [images, setImages] = useState(images_initial)

  const append_user_captured_image = (imageURL) => {
    return setImages([...images, { source: imageURL }])
  }

  return (
    <Layout>
      <h2>Capture Image</h2>
      <div className={styles.page_container}>
        <div className={styles.image_canvas_container}>
          <Image onCaptureHandler={append_user_captured_image} />
        </div>
        <div className={styles.images_container}>
          {
            images.map((img, index) => <img key={index} src={img.source} className={styles.image_element} alt="" />)
          }
        </div>
      </div>
    </Layout>
  )
}