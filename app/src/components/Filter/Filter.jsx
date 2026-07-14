import {categories} from "../../data/categories.js";
import styles from "./Filter.module.css";
import markerStyles from "../PlaceMarker/PlaceMarker.module.css";

function Filter({types, setTypes}) {

    function toggle(type) {
        setTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    }

    return (
        <div
            className={styles.filter}
            onTouchStart={(e) => e.stopPropagation()}
        >

            {categories.map(category => (
                <button
                    key={category.id}
                    className={styles.item}
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggle(category.id);
                    }}
                >
                    <span
                        className={
                            `${styles.checkbox} ${
                                types[category.id]
                                    ? markerStyles[category.className]
                                    : ""
                            }`
                        }
                    >
                        {types[category.id] && "✓"}
                    </span>

                    {category.name}

                </button>
            ))}

        </div>
    );
}

export default Filter;