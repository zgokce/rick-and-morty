import React from "react"
import ContentLoader from "react-content-loader"
import styles from "../styles/LocationBox.module.scss"

const LocationBoxLoader = () => {
    return (
        <div className={styles.container}>
        <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="24" rx="3" ry="3" width="108" height="7" />
            <rect x="0" y="54" rx="3" ry="3" width="42" height="6" />
            <rect x="0" y="84" rx="3" ry="3" width="62" height="6" />
            <rect x="0" y="114" rx="3" ry="3" width="72" height="6" />
            <rect x="144" y="54" rx="3" ry="3" width="108" height="7" />
            <rect x="144" y="84" rx="3" ry="3" width="108" height="7" />
            <rect x="144" y="114" rx="3" ry="3" width="108" height="7" />
        </ContentLoader>
        </div>
    );
};

export default LocationBoxLoader;
