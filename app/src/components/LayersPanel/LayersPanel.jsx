import styles from "./LayersPanel.module.css";
import markerStyles from "../PlaceMarker/PlaceMarker.module.css";

function LayersPanel({layers, activeLayer, setActiveLayer}) {

    return (
        <div className={styles.layersPanel}>

            {layers.map((layer) => (

                <button
                    key={layer}
                    className={styles.item}
                    type="button"
                    onClick={() => {
                        setActiveLayer(layer);
                    }}
                >

                    <span className={`${styles.checkbox} ${markerStyles["marker-default"]}`}>
                        {activeLayer === layer && "✓"}
                    </span>

                    {layer}

                </button>

            ))}

        </div>
    );
}

export default LayersPanel;